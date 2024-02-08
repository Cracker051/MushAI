from typing import Dict, List

from blog import models as blog_models
from blog import schemas as blog_schemas
from database import AsyncSession
from dependencies import get_db_session
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import exc as sa_exc
from sqlmodel import select
from utils import process_sa_exception

blog_router = APIRouter()


@blog_router.get("/", response_model=List[blog_schemas.BlogRead])
async def get_blogs(session: AsyncSession = Depends(get_db_session)):
    blogs = await session.exec(select(blog_models.Blog))
    return blogs.all()


@blog_router.get(
    "/{id}",
    response_model=blog_schemas.BlogRead,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        }
    },
)
async def get_blog_by_id(id: int, session: AsyncSession = Depends(get_db_session)):
    blog = await session.get(blog_models.Blog, id)
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog with id {id} not found!",
        )
    return blog


@blog_router.post(
    "/",
    response_model=blog_schemas.BlogRead,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        }
    },
)
async def create_blog(
    blog: blog_schemas.BlogCreate,
    session: AsyncSession = Depends(get_db_session),
):
    blog = blog_models.Blog.model_validate(blog)
    session.add(blog)
    try:
        await session.commit()
    except sa_exc.IntegrityError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=process_sa_exception(e),
        )
    await session.refresh(blog)
    return blog


@blog_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(id: int, session: AsyncSession = Depends(get_db_session)):
    blog = await session.get(blog_models.Blog, id)
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog with id {id} not found!",
        )
    session.delete(blog)
    session.commit()
    return {}


@blog_router.patch(
    "/{id}",
    response_model=blog_schemas.BlogRead,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        }
    },
)
async def update_blog(
    id: int,
    updated_blog: blog_schemas.BlogUpdate,
    session: AsyncSession = Depends(get_db_session),
):
    blog = await session.get(blog_models.Blog, id)
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog with id {id} not found!",
        )
    patched_blog = updated_blog.model_dump(exclude_unset=True)
    for field, value in patched_blog.items():
        setattr(blog, field, value)
    session.add(blog)
    await session.commit()
    await session.refresh(blog)
    return blog


comment_router = APIRouter()


@comment_router.post(
    "/",
    response_model=blog_schemas.CommentRead,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        }
    },
)
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
