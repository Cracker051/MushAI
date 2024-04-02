from typing import Callable

from auth.managers import UserManager
from auth.models import User
from fastapi import Depends, HTTPException, status
from fastapi_users.authentication import JWTStrategy
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from generic.config import settings
from generic.dependencies import get_db_session
from sqlalchemy import literal, select
from sqlmodel.ext.asyncio.session import AsyncSession


async def get_user_db(session: AsyncSession = Depends(get_db_session)) -> SQLAlchemyUserDatabase:
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(user_db=Depends(get_user_db)) -> UserManager:
    yield UserManager(user_db)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=settings.APP_SECRET, lifetime_seconds=3600)


def validate_user_id() -> Callable:
    async def inner(user_id: int, session: AsyncSession = Depends(get_db_session)) -> int:
        row_exists = (
            await session.exec(
                select(literal(1)).
                select_from(User).
                where(User.id == user_id).
                limit(1)
            )
        ).first()
        if row_exists is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id = {user_id} not found!",
            )
        return user_id

    return inner
