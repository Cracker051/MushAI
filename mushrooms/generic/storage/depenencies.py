from fastapi import HTTPException, UploadFile, status


def validate_image(size_limit: float = 5):

    def inner(img: UploadFile = None):
        if img is None:
            return

        if not img.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only images is supported!",
            )
        if img.size > size_limit * 1000000:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"The max size of image is {round(size_limit, 2)} MB!",
            )
        return img

    return inner
