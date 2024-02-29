import datetime
from typing import Optional

from auth.schemas import UserRead
from generic.sqlmodel.models import BaseSQLModel


class BlogRead(BaseSQLModel, table=False):
    id: Optional[int] = None
    title: str
    user: UserRead
    created_at: datetime.datetime
    content: str


class BlogCreate(BaseSQLModel, table=False):
    title: str
    user_id: int
    content: str


class BlogUpdate(BaseSQLModel, table=False):
    title: Optional[str] = None
    content: Optional[str] = None


class CommentRead(BaseSQLModel, table=False):
    id: Optional[int] = None
    parent_id: Optional[int]
    user: UserRead
    blog_id: int
    created_at: datetime.datetime
    body: str


class CommentCreate(BaseSQLModel, table=False):
    parent_id: Optional[int]
    user_id: int
    blog_id: int
    body: str
