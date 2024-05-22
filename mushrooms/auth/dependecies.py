from typing import Callable

from auth.managers import UserManager
from auth.models import User
from fastapi import Depends, HTTPException, Request, status
from fastapi_users.authentication import JWTStrategy
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase
from generic.config import settings
from generic.dependencies import get_db_session
from sqlalchemy import literal, select
from sqlmodel.ext.asyncio.session import AsyncSession


async def get_user_db(session: AsyncSession = Depends(get_db_session)) -> SQLAlchemyUserDatabase:
    yield SQLAlchemyUserDatabase(session, User)


async def get_user_manager(user_db=Depends(get_user_db)) -> UserManager:
    yield UserManager(user_db)


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=settings.APP_SECRET, lifetime_seconds=3600)


def validate_user_id() -> Callable:
    async def inner(user_id: int, session: AsyncSession = Depends(get_db_session)) -> int:
        row_exists = (
            await session.exec(
                select(literal(1)).
                select_from(User).
                where(User.id == user_id).
                limit(1)
            )
        ).first()
        if row_exists is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with id = {user_id} not found!",
            )
        return user_id

    return inner


async def request_user(
    request: Request,
    jwt_decoder: JWTStrategy = Depends(get_jwt_strategy),
    user_manager: UserManager = Depends(get_user_manager),
) -> Request:
    user = None
    if (authorize_token := request.headers.get("Authorization")) and "bearer" in authorize_token.lower():
        authorize_token = authorize_token.rsplit(maxsplit=1)[-1]
        user = await jwt_decoder.read_token(authorize_token, user_manager)
    request.scope["user"] = user
    return request


class UserPermission:
    UNAUTHORIZED_ERROR_MSG = "Authentication credentials were not provided."
    INSUFFICIENT_PRIVILEGES_MSG = "You don't have the required permissions to perform this action"

    def __init__(self, *, require_all: bool = True, **permissions) -> None:
        self.require_all = require_all
        self.permissions = permissions

    def __call__(self, request: Request) -> User:
        if (user := request.scope.get("user")) is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail=self.UNAUTHORIZED_ERROR_MSG,
            )
        self.check_permissions(user)
        return user

    @classmethod
    def from_permissions(cls, require_all: bool = True, /, *instances: "UserPermission") -> "UserPermission":
        permissions = {}
        for instance in instances:
            permissions.update(instance.permissions)
        return cls(require_all=require_all, **permissions)

    def check_permissions(self, user: User) -> None:
        if user.is_superuser:
            return

        predicate = all if self.require_all else any
        if not predicate(getattr(user, perm, False) == value for perm, value in self.permissions.items()):
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=self.INSUFFICIENT_PRIVILEGES_MSG)
