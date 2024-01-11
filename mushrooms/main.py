import auth.models as auth_models
import auth.schemas as auth_schemas
import dependencies as depend
from auth.auth import auth_backend
from config import settings
from database import AsyncSession
from fastapi import Depends, FastAPI
from fastapi_users import FastAPIUsers
from sqlmodel import select

app = FastAPI()

print(settings)
@app.get("/")
async def test(session: AsyncSession = Depends(depend.get_db_session)):
    statement = select(auth_models.User)
    print(statement)
    result = await session.exec(statement)
    for _ in result.all():
        print(_.name)
    return result.all()


fastapi_users = FastAPIUsers[auth_models.User, int](
    depend.get_user_manager,
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
