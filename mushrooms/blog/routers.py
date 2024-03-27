from typing import Dict, List

from auth import models as auth_models
from blog import models as blog_models
from blog import schemas as blog_schemas
from fastapi import APIRouter, Depends, HTTPException, Request, UploadFile, status
from generic.database import AsyncSession
from generic.dependencies import get_db_session
from generic.sqlmodel.utils import check_foreign_keys, process_sa_exception
from generic.storage.depenencies import validate_image
from generic.storage.utils import rename_uploadfile
from sqlalchemy import exc as sa_exc
from sqlmodel import select

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


# TODO: Fix
@blog_router.get(
    "/user/{user_id}/",
    response_model=List[blog_schemas.BlogRead],
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        }
    },
)
async def get_blogs_by_user_id(
    user_id: int,
    session: AsyncSession = Depends(get_db_session),
):
    user = await session.get(auth_models.User, user_id)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id {user_id} not found!",
        )
    blogs = user.blogs
    return blogs


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
    img: UploadFile = Depends(validate_image()),
    session: AsyncSession = Depends(get_db_session),
):
    blog = blog_models.Blog.model_validate(blog)
    await check_foreign_keys(blog, session)

    session.add(blog)
    try:
        await session.commit()
    except sa_exc.SQLAlchemyError as e:
        # TODO: Replace SQLAlchemyError to DBApi
        raise e
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
    "/{id}/",
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


# TODO: Write removing old photo
@blog_router.put(
    "/{id}/",
    response_model=blog_schemas.BlogRead,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        }
    },
)
async def update_blog_icon(
    id: int,
    img: UploadFile = Depends(validate_image()),
    session: AsyncSession = Depends(get_db_session),
):
    blog = await session.get(blog_models.Blog, id)
    if blog is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog with id = {id} not found!",
        )
    if img:
        rename_uploadfile(img, new_name=f"blog_{blog.title}_{blog.user_id}")
    blog.icon = img or blog_models.Blog.icon.default.arg
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
    await check_foreign_keys(comment, session)

    if comment.parent_id is not None:
        upper_parent_id = await session.exec(
            select(blog_models.Comment.parent_id).where(
                blog_models.Comment.id == comment.parent_id
            )
        )
        try:
            comment.parent_id = (
                upper_parent_id.one() or comment.parent_id
            )  # Because parent_id can be null (None)
        except sa_exc.NoResultFound as e:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Comment with id {comment.parent_id} not found. Check parent_id.",
            ) from e

    session.add(comment)
    await session.commit()
    await session.refresh(comment)
    return comment


@comment_router.get("/blog/{blog_id}", response_model=List[blog_schemas.CommentRead])
async def get_comments_by_blog(
    blog_id: int,
    session: AsyncSession = Depends(get_db_session),
):
    comments = await session.exec(
        select(blog_models.Comment).where(blog_models.Comment.blog_id == blog_id)
    )
    return comments.all()
