from typing import List, Optional

from fastapi_storages import FileSystemStorage
from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from generic.config import AVATAR_DIR, DEFAULT_IMG_NAME
from generic.sqlmodel.models import BaseSQLModel
from generic.storage.models import AvatarImageType
from sqlmodel import Field, Relationship


class User(SQLAlchemyBaseUserTable[int], BaseSQLModel, table=True):
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
    avatar: Optional[str] = Field(
        default=DEFAULT_IMG_NAME,
        nullable=False,
        sa_type=AvatarImageType(
            storage=FileSystemStorage(AVATAR_DIR),
        ),
    )

    blogs: List["Blog"] = Relationship(back_populates="user")
    comments: List["Comment"] = Relationship(back_populates="user")

    def __str__(self) -> str:
        return f"({self.id}) {self.email}: {self.name} {self.surname}"

    def __repr__(self) -> str:
        username = self.email.split("@")[0]
        return f"{self.id}_{username}"
