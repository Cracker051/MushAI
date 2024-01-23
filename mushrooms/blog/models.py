from typing import Optional
from sqlmodel import Field, SQLModel, Relationship
from auth.models import User
import datetime


class Blog(SQLModel, table=True):
    __tablename__ = "mushroom_blog"

    id: int | None = Field(default=None, primary_key=True)
    title: str
    user_id: int = Field(foreign_key="auth_user.id")
    created_at: datetime.date = Field(default=datetime.datetime.now().date)
    content: str

    user: User = Relationship(back_populates="blogs")
    comments: list["Comment"] = Relationship(back_populates="blog")


class Comment(SQLModel, table=True):
    __tablename__ = "mushroom_comment"

    id: int | None = Field(default=None, primary_key=True)
    parent_id: int | None = Field(foreign_key="mushroom_comment.id")
    user_id: int = Field(foreign_key="auth_user.id")
    blog_id: int = Field(foreign_key="mushroom_blog.id")
    created_at: datetime.datetime = Field(default=datetime.datetime.now())
    body: str

    user: User = Relationship(back_populates="comments")
    blog: Blog = Relationship(back_populates="comments")
    comments: list["Comment"] = Relationship(back_populates="parent_comment")
    parent_comment: Optional["Comment"] = Relationship(back_populates="comments")
