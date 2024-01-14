from dotenv import load_dotenv
from typing import Optional
from pydantic_settings import BaseSettings

load_dotenv(override=True)


class Settings(BaseSettings):
    APP_SECRET: str

    POSTGRES_USER: str
    POSTGRES_PASSWORD: str
    POSTGRES_HOST: str
    POSTGRES_PORT: int
    POSTGRES_DB: str

    SMTP_HOST: str
    SMTP_EMAIL: str
    SMTP_TOKEN: str


settings = Settings()
