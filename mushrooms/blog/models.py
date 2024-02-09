import datetime
from copy import deepcopy
from functools import lru_cache
from typing import List, Optional

from auth.models import User
from sqlmodel import Field, Relationship, SQLModel


class ExtendedSQLModel(SQLModel):
    @classmethod
    @lru_cache(maxsize=1)
    def get_foreign_keys(cls):
        if not cls.model_config.get("table"):
            return

        foreign_keys = {
            name: schema.foreign_keys.pop().target_fullname
            for name, schema in deepcopy(cls.__table__.c).items()
            if schema.foreign_keys
        }

        return foreign_keys


class Blog(SQLModel, table=True):
    __tablename__ = "mushroom_blog"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    user_id: int = Field(foreign_key="auth_user.id")
    created_at: datetime.datetime = Field(default=datetime.datetime.now())
    content: str

    user: User = Relationship(back_populates="blogs")
    comments: List["Comment"] = Relationship(back_populates="blog")


class Comment(ExtendedSQLModel, table=True):
    __tablename__ = "mushroom_comment"
    id: Optional[int] = Field(default=None, primary_key=True)
    parent_id: Optional[int] = Field(foreign_key="mushroom_comment.id")
    user_id: int = Field(foreign_key="auth_user.id")
    blog_id: int = Field(foreign_key="mushroom_blog.id")
    created_at: datetime.datetime = Field(default=datetime.datetime.now())
    body: str

    user: User = Relationship(back_populates="comments")
    blog: Blog = Relationship(back_populates="comments")
    comments: List["Comment"] = Relationship(back_populates="parent_comment")
    parent_comment: Optional["Comment"] = Relationship(
        back_populates="comments",
        sa_relationship_kwargs={"remote_side": "Comment.id"},
    )
