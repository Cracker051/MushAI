import io
import os
from typing import Any

from fastapi_storages import StorageImage
from fastapi_storages.exceptions import ValidationException
from fastapi_storages.integrations.sqlalchemy import ImageType
from generic.config import DEFAULT_IMG_NAME
from generic.storage.utils import rename_uploadfile
from PIL import Image, UnidentifiedImageError
from sqlalchemy import Dialect


class WebpImageType(ImageType):
    WEBP_EXTENSION = "webp"

    @classmethod
    def _process_image_to_buffer(cls, value: Any, buffer: io.BytesIO):
        image_file = Image.open(value.file)
        image_file.save(
            buffer,
            format=cls.WEBP_EXTENSION,
            optimize=True,
            quality=95,
        )

    def process_bind_param(self, value: Any, dialect: Dialect) -> str | None:
        if value == DEFAULT_IMG_NAME:
            return value

        if value is None or len(value.file.read(1)) != 1:
            return
        image_buffer = io.BytesIO()
        try:
            image_file = Image.open(value.file)
            image_file.verify()
        except UnidentifiedImageError:
            raise ValidationException("Invalid image file")
        else:
            self._process_image_to_buffer(value, image_buffer)
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
    AVATAR_MAX_SIZE = (184, 184)

    @classmethod
    def _process_image_to_buffer(cls, value: Any, buffer: io.BytesIO):
        image_file = Image.open(value.file)
        image_file.thumbnail(cls.AVATAR_MAX_SIZE)
        image_file.save(
            buffer,
            format=cls.WEBP_EXTENSION,
            optimize=True,
            quality=95,
        )
