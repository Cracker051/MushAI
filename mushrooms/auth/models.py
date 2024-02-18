from typing import List, Optional

from common.models import SQLModel
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlmodel import Field, Relationship


class User(SQLAlchemyBaseUserTable[int], SQLModel, table=True):
    __tablename__ = "auth_user"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    surname: str
    email: str
    hashed_password: str
    is_active: bool = Field(default=True)
    is_staff: bool = Field(default=False)
    is_superuser: bool = Field(default=False)
    is_verified: bool = Field(default=False)
    avatar: Optional[str] = Field(default=None)

    blogs: List["Blog"] = Relationship(back_populates="user")
    comments: List["Comment"] = Relationship(back_populates="user")

    def __str__(self) -> str:
        return f"({self.id}) {self.email}: {self.name} {self.surname}"
