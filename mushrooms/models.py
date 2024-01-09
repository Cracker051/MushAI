from typing import Optional

from fastapi_users import schemas
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlmodel import Field, SQLModel


class User(SQLAlchemyBaseUserTable[int], SQLModel, table=True):
    __tablename__ = "auth_user"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    surname: str
    email: str
    hashed_password: str
    is_active: bool = Field(default=True)
    is_staff: Optional[bool] = Field(default=False)
    is_superuser: bool = Field(default=False)
    is_verified: bool = Field(default=False)
    avatar: Optional[str]


class UserCreate(schemas.CreateUpdateDictModel, SQLModel, table=False):
    name: str
    surname: str
    email: str
    password: str
    avatar: Optional[str]


class UserRead(SQLModel, table=False):
    id: int
    name: str
    surname: str
    email: str
    is_active: bool
    is_staff: bool
    is_superuser: bool
    is_verified: bool
    avatar: Optional[str]
