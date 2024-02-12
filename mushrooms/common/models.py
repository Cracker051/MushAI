from copy import deepcopy

from sqlmodel.main import SQLModel, SQLModelMetaclass


# TODO: Find alternatives to deepcopy
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
