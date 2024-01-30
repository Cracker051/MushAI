import datetime
from typing import Optional

from sqlmodel import SQLModel


class Blog(SQLModel, table=False):
    id: int
    title: str
    user_id: int
    created_at: datetime.datetime
    content: str


class Comment(SQLModel, table=False):
    id: Optional[int] = None
    parent_id: Optional[int]
    user_id: int
    blog_id: int
    created_at: datetime.datetime
    body: str
