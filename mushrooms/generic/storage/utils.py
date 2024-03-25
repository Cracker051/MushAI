import os

from fastapi import HTTPException, UploadFile, status


def rename_uploadfile(
    file: UploadFile,
    new_name: str | None = None,
    new_extension: str | None = None,
):
    name, extension = os.path.splitext(file.filename)
    final_name = (new_name or name) + (new_extension or ("." + extension))
    file.filename = final_name


# TODO: Write own Exceptions
# TODO: Use in user avatar, etc
def validate_image(img: UploadFile, size_limit: float = 5000000):
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
