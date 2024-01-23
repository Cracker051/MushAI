from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable
from sqlmodel import Field, SQLModel, Relationship


class User(SQLAlchemyBaseUserTable[int], SQLModel, table=True):
    __tablename__ = "auth_user"

    id: int | None = Field(default=None, primary_key=True)
    name: str
    surname: str
    email: str
    hashed_password: str
    is_active: bool = Field(default=True)
    is_staff: bool = Field(default=False)
    is_superuser: bool = Field(default=False)
    is_verified: bool = Field(default=False)
    avatar: str | None = Field(default=None)

    blogs: list["Blog"] = Relationship(back_populates="user")
    comments: list["Comment"] = Relationship(back_populates="user")
