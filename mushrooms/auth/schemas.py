from typing import Optional

from fastapi_users import schemas
from generic.sqlmodel.models import BaseSQLModel


class UserCreate(schemas.CreateUpdateDictModel, BaseSQLModel, table=False):
    name: str
    surname: str
    email: str
    password: str


class UserRead(BaseSQLModel, table=False):
    id: int
    name: str
    surname: str
    email: str
    is_active: bool
    is_staff: bool
    is_superuser: bool
    is_verified: bool
    avatar: Optional[str]


class UserUpdate(schemas.CreateUpdateDictModel, BaseSQLModel, table=False):
    name: Optional[str] = None
    surname: Optional[str] = None


class PreviewUser(BaseSQLModel, table=False):
    id: int
    name: str
    surname: str


class AvatarPreviewUser(PreviewUser):
    avatar: str
