from fastapi_users import schemas
from sqlmodel import SQLModel


class UserCreate(schemas.CreateUpdateDictModel, SQLModel, table=False):
    name: str
    surname: str
    email: str
    password: str
    avatar: str | None = None


class UserRead(SQLModel, table=False):
    id: int
    name: str
    surname: str
    email: str
    is_active: bool
    is_staff: bool
    is_superuser: bool
    is_verified: bool
    avatar: str | None
