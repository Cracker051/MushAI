import smtplib

from config import settings
from database import AsyncSession, async_session
from fastapi import Depends


async def get_db_session() -> AsyncSession:
    async with async_session() as session:
        yield session


async def get_smtp_server(
    smtp_host=Depends(settings.SMTP_HOST),
    smtp_email=Depends(settings.SMTP_EMAIL),
    smtp_token=Depends(settings.SMTP_TOKEN),
) -> smtplib.SMTP:
    with smtplib.SMTP_SSL(host=smtp_host) as smtp:
        smtp.login(user=smtp_email, password=smtp_token)
        yield smtp
