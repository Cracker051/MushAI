from typing import Dict

from auth import schemas
from auth.auth import auth_backend, fastapi_users
from auth.dependecies import get_avatar_limitation
from auth.models import User
from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from generic.database import AsyncSession
from generic.dependencies import get_db_session
from generic.storage.utils import rename_uploadfile

auth_router = fastapi_users.get_auth_router(auth_backend)

register_router = fastapi_users.get_register_router(
    schemas.UserRead,
    schemas.UserCreate,
)

verify_router = fastapi_users.get_verify_router(schemas.UserRead)

users_router = fastapi_users.get_users_router(schemas.UserRead, schemas.UserUpdate)

reset_password_router = fastapi_users.get_reset_password_router()

avatar_router = APIRouter()


@avatar_router.put(
    "/{id}/avatar/",
    responses={
        status.HTTP_400_BAD_REQUEST: {
            "description": "Bad File Error",
            "model": Dict[str, str],
        },
        status.HTTP_404_NOT_FOUND: {
            "description": "Not Found Error",
            "model": Dict[str, str],
        },
    },
    response_model=schemas.UserRead,
)
async def update_avatar(
    id: int,
    avatar: UploadFile = None,
    avatar_limitation: float = Depends(get_avatar_limitation),
    session: AsyncSession = Depends(get_db_session),
):
    user = await session.get(User, id)
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with id = {id} not found!",
        )
    if avatar is not None:
        if not avatar.content_type.startswith("image/"):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only images is supported!",
            )
        if avatar.size > avatar_limitation:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"The max size of image is {round(avatar_limitation/1000000, 2)} MB!",
            )
        rename_uploadfile(avatar, new_name=f"avatar_{user.id}")

    user.avatar = avatar or User.avatar.default.arg
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user
