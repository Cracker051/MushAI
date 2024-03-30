import os

from dotenv import load_dotenv
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

    FRONTEND_URL: str = "http://127.0.0.1:8888"


settings = Settings()

STATIC_DIR = "static"
AVATAR_DIR = os.path.join(STATIC_DIR, "avatar")
BLOG_IMG_DIR = os.path.join(STATIC_DIR, "blog")
EMAIL_DIR = os.path.join(STATIC_DIR, "email")

MODELS_DIR = "mushrooms/prediction/models/"
ALLOWED_ORIGINS = (settings.FRONTEND_URL,)

DEFAULT_IMG_NAME = "default.webp"  # Use only in different subdirectories
