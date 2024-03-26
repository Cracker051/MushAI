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
