import datetime
from typing import Optional

from auth.schemas import UserRead
from bs4 import BeautifulSoup
from generic.schemas import BaseJSONModel
from generic.sqlmodel.models import BaseSQLModel
from pydantic import field_validator


class BlogRead(BaseSQLModel, table=False):
    id: Optional[int] = None
    title: str
    user: UserRead
    created_at: datetime.datetime
    content: str
    icon: str


class BlogAction(BaseJSONModel):
    title: str
    content: str

    @field_validator("content")
    @staticmethod
    def validate_content(value):
        if BeautifulSoup(value, "html.parser").find() is not None:
            raise ValueError("HTML is not allowed in content. Use BBCode instead.")
        return value


class BlogCreate(BlogAction):
    user_id: int


class BlogUpdate(BlogAction):
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
