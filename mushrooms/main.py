from email.mime.text import MIMEText
import smtplib
import auth.models as auth_models
import auth.schemas as auth_schemas
from dependencies import get_db_session, get_user_manager
from auth.auth import auth_backend
from database import AsyncSession
from fastapi import Depends, FastAPI
from fastapi_users import FastAPIUsers
from sqlmodel import select

from config import settings

app = FastAPI()


# TODO: Delete in prod
@app.get("/")
async def test(
    session: AsyncSession = Depends(get_db_session),
    smtp_host=settings.SMTP_HOST,
    smtp_email=settings.SMTP_EMAIL,
    smtp_token=settings.SMTP_TOKEN,
):
    # breakpoint()
    smtp = smtplib.SMTP_SSL(host=smtp_host, port=465)
    print(1)
    smtp.login(user=smtp_email, password=smtp_token)
    msg = MIMEText("test")
    msg["from"] = smtp_email
    msg["to"] = "doctorwalter1@gmail.com"
    smtp.send_message(msg=msg)
    smtp.quit()


fastapi_users = FastAPIUsers[auth_models.User, int](
    get_user_manager,
    [auth_backend],
)


app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)

app.include_router(
    fastapi_users.get_register_router(auth_schemas.UserRead, auth_schemas.UserCreate),
    prefix="/auth",
    tags=["auth"],
)

# TODO: request-verify-token - if token isnt expired, then what?
app.include_router(
    fastapi_users.get_verify_router(auth_schemas.UserRead),
    prefix="/auth",
    tags=["auth"],
)
