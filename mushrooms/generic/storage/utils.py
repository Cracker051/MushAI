import os

from fastapi import UploadFile


def rename_uploadfile(
    file: UploadFile,
    new_name: str | None = None,
    new_extension: str | None = None,
):
    name, extension = os.path.splitext(file.filename)
    if new_extension is not None:
        new_extension = "." + new_extension

    final_name = (new_name or name) + (new_extension or extension)
    file.filename = final_name
