# TODO: Write own Exceptions
# TODO: Use in user avatar, etc
from fastapi import HTTPException, UploadFile, status


def validate_image(size_limit: float = 5000000):
    def inner(img: UploadFile):
        if not img.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only images is supported!",
            )
        if img.size > size_limit:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"The max size of image is {round(size_limit/1000000, 2)} MB!",
            )
        return img

    return inner
