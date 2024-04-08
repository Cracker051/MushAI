import os
from secrets import token_urlsafe
from typing import Dict, List

from auth.dependecies import validate_user_id
from auth.models import User
from blog import schemas as blog_schemas
from blog.models import Blog, Comment
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from generic.database import AsyncSession
from generic.dependencies import get_db_session
from generic.sqlmodel.utils import check_foreign_keys, get_obj_by_id_or_404, process_sa_exception
from generic.storage.depenencies import validate_image
from generic.storage.utils import rename_uploadfile
from sqlalchemy import exc as sa_exc
from sqlalchemy.orm import joinedload
from sqlmodel import select

blog_router = APIRouter()


@blog_router.get("/", response_model=List[blog_schemas.PreviewBlogRead])
async def get_blogs(session: AsyncSession = Depends(get_db_session)):
    blogs = await session.exec(select(Blog).options(joinedload(Blog.user).load_only(User.id, User.name, User.surname)))
    return blogs.all()


@blog_router.get("/posted/", response_model=List[blog_schemas.PreviewBlogRead])
async def get_posted_blogs(session: AsyncSession = Depends(get_db_session)):
    blogs = await session.exec(
        select(Blog)
        .options(joinedload(Blog.user).load_only(User.id, User.name, User.surname))
        .where(Blog.is_draft == False)
    )
    return blogs.all()


@blog_router.get("/drafts/", response_model=List[blog_schemas.PreviewBlogRead])
async def get_draft_blogs(session: AsyncSession = Depends(get_db_session)):
    blogs = await session.exec(
        select(Blog)
        .options(joinedload(Blog.user).load_only(User.id, User.name, User.surname))
        .where(Blog.is_draft == True)
    )
    return blogs.all()


@blog_router.get("/posted/{user_id}", response_model=List[blog_schemas.BlogRead])
async def get_posted_user_blogs(
    user_id: int = Depends(validate_user_id()),
    session: AsyncSession = Depends(get_db_session),
):
    blogs = await session.exec(select(Blog).where(Blog.user_id == user_id).where(Blog.is_draft == False))
    return blogs.all()


@blog_router.get("/drafts/{user_id}", response_model=List[blog_schemas.BlogRead])
async def get_draft_user_blogs(
    user_id: int = Depends(validate_user_id()),
    session: AsyncSession = Depends(get_db_session),
):
    blogs = await session.exec(select(Blog).where(Blog.user_id == user_id).where(Blog.is_draft == True))
    return blogs.all()


@blog_router.get(
    "/{id}",
    response_model=blog_schemas.UserBlogRead,
    responses={
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        }
    },
)
async def get_blog_by_id(id: int, session: AsyncSession = Depends(get_db_session)):
    statement = select(Blog).options(joinedload(Blog.user)).where(Blog.id == id)
    blog = (await session.scalars(statement)).first()
    if not blog:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Blog with id {id} not found!",
        )
    return blog


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
    user_id: int = Depends(validate_user_id()),
    session: AsyncSession = Depends(get_db_session),
):
    blogs = await session.exec(select(Blog).where(Blog.user_id == user_id))
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
    blog = Blog.model_validate(blog)
    await check_foreign_keys(blog, session)

    if img is not None:
        rename_uploadfile(img, new_name=token_urlsafe())
    blog.icon = img

    session.add(blog)
    try:
        await session.commit()
    except sa_exc.DBAPIError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=process_sa_exception(e))
    await session.refresh(blog)
    return blog


@blog_router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_blog(id: int, session: AsyncSession = Depends(get_db_session)):
    blog = await session.get(Blog, id)
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
    blog = await session.get(Blog, id)
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
    blog = await get_obj_by_id_or_404(Blog, id, session)
    old_icon = blog.icon

    if img is not None:
        rename_uploadfile(img, new_name=token_urlsafe())

    blog.icon = img or Blog.icon.default.arg
    session.add(blog)
    await session.commit()
    await session.refresh(blog)

    if os.path.basename(old_icon) != Blog.icon.default.arg:
        os.remove(old_icon)

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
    comment = Comment.model_validate(comment)
    await check_foreign_keys(comment, session)

    if comment.parent_id is not None:
        upper_parent_id = await session.exec(select(Comment.parent_id).where(Comment.id == comment.parent_id))
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


@comment_router.get("/blog/{blog_id}", response_model=List[blog_schemas.PreviewComment])
async def get_comments_by_blog(
    blog_id: int,
    session: AsyncSession = Depends(get_db_session),
):
    comments = await session.exec(
        select(Comment)
        .options(joinedload(Comment.user).load_only(User.id, User.name, User.surname, User.avatar))
        .where(Comment.blog_id == blog_id)
    )
    return comments.all()
