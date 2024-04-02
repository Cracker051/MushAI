import json

from generic.sqlmodel.models import BaseSQLModel
from pydantic import ValidationError, model_validator


# Use it with UploadFile and JSON Body
class BaseJSONModel(BaseSQLModel, table=False):
    @model_validator(mode="before")
    @staticmethod
    def convert_data_to_dict(data):
        try:
            data = json.loads(data)
        except json.decoder.JSONDecodeError:
            raise ValidationError(
                "Can`t parse dict. Remove wrong symbols and try again."
            )
        return data
