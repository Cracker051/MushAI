from typing import Optional

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
