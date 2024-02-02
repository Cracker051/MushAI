import datetime
from typing import Optional

from sqlmodel import SQLModel


class Blog(SQLModel, table=False):
    id: int
    title: str
    user_id: int
    created_at: datetime.datetime
    content: str


class CommentRead(SQLModel, table=False):
    id: Optional[int] = None
    parent_id: Optional[int]
    user_id: int
    blog_id: int
    created_at: datetime.datetime
    body: str


class CommentCreate(SQLModel, table=False):
    parent_id: Optional[int]
    user_id: int
    blog_id: int
    body: str
