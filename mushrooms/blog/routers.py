from typing import List

from blog import models as blog_models
from blog import schemas as blog_schemas
from database import AsyncSession
from dependencies import get_db_session
from fastapi import APIRouter, Depends
from sqlmodel import select

blog_router = APIRouter()
comment_router = APIRouter()


@blog_router.get("/", response_model=List[blog_schemas.Blog])
async def get_blogs(session: AsyncSession = Depends(get_db_session)):
    blogs = await session.exec(select(blog_models.Blog))
    return blogs.all()


@comment_router.post("/comment/", response_model=blog_schemas.CommentRead)
async def comment_create(
    comment: blog_schemas.CommentCreate,
    session: AsyncSession = Depends(get_db_session),
):
    comment = blog_models.Comment.model_validate(comment)
    if comment.parent_id is not None:
        upper_parent_id = await session.exec(
            select(blog_models.Comment.parent_id).where(
                blog_models.Comment.id == comment.parent_id
            )
        )
        comment.parent_id = upper_parent_id.first()
    session.add(comment)
    await session.commit()
    await session.refresh(comment)
    return comment
