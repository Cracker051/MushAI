import smtplib
from contextlib import contextmanager
from typing import AsyncIterator, Iterator

from generic.config import settings
from generic.database import async_session
from sqlmodel.ext.asyncio.session import AsyncSession


async def get_db_session() -> AsyncIterator[AsyncSession]:
    async with async_session() as session:
        yield session


@contextmanager
def get_smtp_server(
    smtp_host=settings.SMTP_HOST,
    smtp_email=settings.SMTP_EMAIL,
    smtp_token=settings.SMTP_TOKEN,
) -> Iterator[smtplib.SMTP]:
    smtp = smtplib.SMTP_SSL(host=smtp_host)
    smtp.login(user=smtp_email, password=smtp_token)
    try:
        yield smtp
    finally:
        smtp.__exit__()
