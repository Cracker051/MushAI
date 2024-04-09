from typing import Callable

from fastapi import Depends, HTTPException, status
from generic.dependencies import get_db_session
from sqlalchemy import literal, select
from sqlmodel.ext.asyncio.session import AsyncSession
from blog.models import Blog


def validate_blog_id() -> Callable:
    async def inner(blog_id: int, session: AsyncSession = Depends(get_db_session)) -> int:
        row_exists = (
            await session.exec(select(literal(1)).select_from(Blog).where(Blog.id == blog_id).limit(1))
        ).first()
        if row_exists is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Blog with id = {blog_id} not found!",
            )
        return blog_id

    return inner
