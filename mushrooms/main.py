import dependencies as depend
import models
from auth import auth_backend
from database import AsyncSession
from fastapi import Depends, FastAPI
from fastapi_users import FastAPIUsers
from sqlmodel import select

app = FastAPI()


@app.get("/")
async def test(session: AsyncSession = Depends(depend.get_db_session)):
    statement = select(models.User)
    print(statement)
    result = await session.exec(statement)
    for _ in result.all():
        print(_.name)
    return result.all()


fastapi_users = FastAPIUsers[models.User, int](
    depend.get_user_manager,
    [auth_backend],
)


app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)


app.include_router(
    fastapi_users.get_register_router(models.UserRead, models.UserCreate),
    prefix="/auth",
    tags=["auth"],
)
