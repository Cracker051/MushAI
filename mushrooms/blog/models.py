import datetime
from typing import List, Optional

from auth.models import User
from generic.sqlmodel.models import BaseSQLModel
from sqlmodel import Field, Relationship


class Blog(BaseSQLModel, table=True):
    __tablename__ = "mushroom_blog"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    user_id: int = Field(foreign_key="auth_user.id")
    created_at: datetime.datetime = Field(default=datetime.datetime.now())
    content: str

    user: User = Relationship(
        back_populates="blogs", sa_relationship_kwargs={"lazy": "joined"}
    )
    comments: List["Comment"] = Relationship(back_populates="blog")

    def __str__(self) -> str:
        return f"({self.id}) {self.user.email}: {self.title}"


class Comment(BaseSQLModel, table=True):
    __tablename__ = "mushroom_comment"
    id: Optional[int] = Field(default=None, primary_key=True)
    parent_id: Optional[int] = Field(foreign_key="mushroom_comment.id")
    user_id: int = Field(foreign_key="auth_user.id")
    blog_id: int = Field(foreign_key="mushroom_blog.id")
    created_at: datetime.datetime = Field(default=datetime.datetime.now())
    body: str

    user: User = Relationship(
        back_populates="comments", sa_relationship_kwargs={"lazy": "joined"}
    )
    blog: Blog = Relationship(back_populates="comments")
    comments: List["Comment"] = Relationship(back_populates="parent_comment")
    parent_comment: Optional["Comment"] = Relationship(
        back_populates="comments",
        sa_relationship_kwargs={"remote_side": "Comment.id"},
    )

    def __str__(self) -> str:
        return f"({self.id}) {self.blog_id} - {self.user.email}: {self.body[:20]}"
