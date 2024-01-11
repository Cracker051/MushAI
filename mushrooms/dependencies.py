from auth.managers import UserManager
from auth.models import User
from database import AsyncSession, async_session
from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase


async def get_db_session() -> AsyncSession:
    async with async_session() as session:
        yield session


async def get_user_db(session: AsyncSession = Depends(get_db_session)):
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(user_db=Depends(get_user_db)):
    yield UserManager(user_db)
