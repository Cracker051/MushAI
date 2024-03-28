from auth.managers import UserManager
from auth.models import User
from fastapi import Depends
from fastapi_users.authentication import JWTStrategy
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from generic.config import settings
from generic.dependencies import get_db_session
from sqlmodel.ext.asyncio.session import AsyncSession


async def get_user_db(
    session: AsyncSession = Depends(get_db_session),
) -> SQLAlchemyUserDatabase:
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(user_db=Depends(get_user_db)) -> UserManager:
    yield UserManager(user_db)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=settings.APP_SECRET, lifetime_seconds=3600)
