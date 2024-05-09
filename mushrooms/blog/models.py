import datetime
from typing import List, Optional

from auth.models import User
from fastapi_storages import FileSystemStorage
from generic.config import BLOG_IMG_DIR, DEFAULT_IMG_NAME
from generic.sqlmodel.models import BaseSQLModel
from generic.storage.models import WebpImageType
from sqlmodel import Field, Relationship


class Blog(BaseSQLModel, table=True):
    __tablename__ = "mushroom_blog"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    user_id: int = Field(foreign_key="auth_user.id")
    created_at: datetime.datetime = Field(default=datetime.datetime.now())
    content: str
    is_draft: bool = True
    icon: Optional[str] = Field(
        default=DEFAULT_IMG_NAME,
        nullable=False,
        sa_type=WebpImageType(
            storage=FileSystemStorage(BLOG_IMG_DIR),
        ),
    )

    user: User = Relationship(back_populates="blogs", sa_relationship_kwargs={"lazy": "noload"})
    comments: List["Comment"] = Relationship(back_populates="blog")

    def __str__(self) -> str:
        return f"({self.__class__.__name__}) {self.id} - {self.title}"


class Comment(BaseSQLModel, table=True):
    __tablename__ = "mushroom_comment"
    id: Optional[int] = Field(default=None, primary_key=True)
    parent_id: Optional[int] = Field(foreign_key="mushroom_comment.id")
    user_id: int = Field(foreign_key="auth_user.id")
    blog_id: int = Field(foreign_key="mushroom_blog.id")
    created_at: datetime.datetime = Field(default=datetime.datetime.now())
    body: str

    user: User = Relationship(back_populates="comments", sa_relationship_kwargs={"lazy": "selectin"})
    blog: Blog = Relationship(back_populates="comments")
    comments: List["Comment"] = Relationship(back_populates="parent_comment")
    parent_comment: Optional["Comment"] = Relationship(
        back_populates="comments",
        sa_relationship_kwargs={"remote_side": "Comment.id"},
    )

    def __str__(self) -> str:
        return f"({self.__class__.__name__}) {self.id} - {self.user.email} {self.created_at.date()}"
