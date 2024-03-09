import os
import pickle

from fastapi import APIRouter
from generic.config import MODELS_DIR
from tensorflow.keras.models import load_model

prediction_router = APIRouter()

ml_models = {}


# TODO: Lifespan doesnt work, so we use deprecated
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
