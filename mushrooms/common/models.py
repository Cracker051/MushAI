import io
import os
from copy import deepcopy
from typing import Any

from common.config import AVATAR_DIR
from common.utils import rename_uploadfile
from fastapi_storages import StorageImage
from fastapi_storages.exceptions import ValidationException
from fastapi_storages.integrations.sqlalchemy import ImageType
from PIL import Image, UnidentifiedImageError
from sqlalchemy import Dialect
from sqlmodel.main import SQLModel, SQLModelMetaclass


class ExtendedSQLModelMetaclass(SQLModelMetaclass):
    def __init__(cls, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if cls.model_config.get("table"):
            cls.foreign_keys = {
                name: schema.foreign_keys.pop().target_fullname
                for name, schema in deepcopy(cls.__table__.c).items()
                if schema.foreign_keys
            }


# Only override metaclass, nothing else
class SQLModel(SQLModel, metaclass=ExtendedSQLModelMetaclass):
    pass


class WebpImageType(ImageType):
    WEBP_EXTENSION = "webp"

    def process_bind_param(self, value: Any, dialect: Dialect) -> str | None:
        if value is None or len(value.file.read(1)) != 1:
            return
        try:
            image_file = Image.open(value.file)
            image_file.verify()
        except UnidentifiedImageError:
            raise ValidationException("Invalid image file")
        else:
            image_file = Image.open(value.file)
            image_file = image_file.resize((184, 184))
            image_buffer = io.BytesIO()
            image_file.save(
                image_buffer,
                format=self.WEBP_EXTENSION,
                optimize=True,
                quality=95,
            )

            rename_uploadfile(value, new_extension=self.WEBP_EXTENSION)
            image = StorageImage(
                name=value.filename,
                storage=self.storage,
                height=image_file.height,
                width=image_file.width,
            )
            image.write(file=image_buffer)
        finally:
            image_buffer.close()
            image_file.close()
            value.file.close()
        return image.name


class AvatarImageType(WebpImageType):
    def process_bind_param(self, value: Any, dialect: Dialect) -> str | None:
        if isinstance(value, str) and os.path.isfile(
            f"{os.getcwd()}/{AVATAR_DIR}/{value}"
        ):
            return value
        return super().process_bind_param(value, dialect)
