import smtplib

from auth.managers import UserManager
from auth.models import User
from config import settings
from database import AsyncSession, async_session
from fastapi import Depends
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase


async def get_db_session() -> AsyncSession:
    async with async_session() as session:
        yield session


async def get_user_db(
    session: AsyncSession = Depends(get_db_session),
) -> SQLAlchemyUserDatabase:
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(user_db=Depends(get_user_db)) -> UserManager:
    yield UserManager(user_db)


async def get_smtp_server(
    smtp_host=settings.SMTP_HOST,
    smtp_email=settings.SMTP_EMAIL,
    smtp_token=settings.SMTP_TOKEN,
) -> smtplib.SMTP:
    with smtplib.SMTP_SSL(host=smtp_host) as smtp:
        smtp.login(user=smtp_email, password=smtp_token)
        yield smtp
