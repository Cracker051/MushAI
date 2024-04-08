import os
import pickle
from typing import Dict

import numpy as np
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from generic.config import MODELS_DIR
from keras.applications.efficientnet import preprocess_input as en_preprocess_input
from keras.models import load_model
from keras.utils import img_to_array
from PIL import Image
from prediction.dependencies import get_image_limitation

prediction_router = APIRouter()

ml_models = {}


# XXX: Lifespan doesnt work, so we use deprecated
@prediction_router.on_event("startup")
async def model_preload():
    global ml_models

    models = ("mushroom",)
    for model_name in models:
        model_dir = os.path.join(MODELS_DIR, model_name)
        model = load_model(f"{model_dir}/model.h5")
        with open(f"{model_dir}/classes.pkl", "rb") as classes_file:
            classes = pickle.load(classes_file)
        ml_models[model_name] = (model, classes)


@prediction_router.on_event("shutdown")
async def model_unload():
    global ml_models
    ml_models.clear()


@prediction_router.post(
    "/mushroom/",
    responses={
        status.HTTP_400_BAD_REQUEST: {
            "description": "Bad File Error",
            "model": Dict[str, str],
        },
    },
)
async def recognize_mushroom(
    image: UploadFile,
    image_limitation: float = Depends(get_image_limitation),
):
    if not image.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only images is supported!",
        )
    if image.size > image_limitation:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"The max size of image is {round(image_limitation/1000000, 2)} MB!",
        )

    with Image.open(image.file) as img:
        img = img.resize((299, 299))
        img_array = img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = en_preprocess_input(img_array)

    global ml_models
    model, classes = ml_models["mushroom"]
    result = model.predict(img_array)
    class_result = classes[np.argmax(result)]
    return {"result": class_result}
