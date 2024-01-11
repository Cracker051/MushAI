from config import settings
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession

CONNECTION_URL = """postgresql+asyncpg://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}""".format(
    db_user=settings.PG_USER,
    db_password=settings.PG_PASSWORD,
    db_host=settings.PG_HOST,
    db_port=settings.PG_PORT,
    db_name=settings.PG_DATABASE,
)

engine = create_async_engine(url=CONNECTION_URL, echo=True)
print("connected to database!")
Base = declarative_base()
async_session = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
