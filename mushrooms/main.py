import smtplib
from email.mime.text import MIMEText

import auth.models as auth_models
import auth.schemas as auth_schemas
from auth.auth import auth_backend
from blog.models import Blog, Comment
from blog.schemas import Comment as CommentSchema
from database import AsyncSession, engine
from dependencies import get_db_session, get_user_manager
from fastapi import Depends, FastAPI
from fastapi_users import FastAPIUsers
from sqlmodel import select

app = FastAPI()


# TODO: Delete in prod
@app.get("/")
async def test(session: AsyncSession = Depends(get_db_session)):
    statement = select(Comment)
    res = await session.exec(statement)
    breakpoint()
    return res.all()


@app.post("/comment/", response_model=CommentSchema)
async def comment_create(
    comment: Comment, session: AsyncSession = Depends(get_db_session)
):
    session.add(comment)
    await session.commit()
    await session.refresh(comment)
    return comment


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
