import os

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlmodel.ext.asyncio.session import AsyncSession

load_dotenv()

SECRET = "secret"

CONNECTION_URL = """postgresql+asyncpg://{db_user}:{db_password}@{db_host}:{db_port}/{db_name}""".format(
    db_user=os.environ.get("PG_USER"),
    db_password=os.environ.get("PG_PASSWORD"),
    db_host=os.environ.get("PG_HOST"),
    db_port=os.environ.get("PG_PORT"),
    db_name=os.environ.get("PG_DATABASE"),
)

engine = create_async_engine(url=CONNECTION_URL, echo=True)
print("connected!")
Base = declarative_base()
async_session = sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)
