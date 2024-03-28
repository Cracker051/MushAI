from typing import Dict

from auth import schemas
from auth.auth import auth_backend, fastapi_users
from auth.models import User
from fastapi import APIRouter, Depends, UploadFile, status
from generic.database import AsyncSession
from generic.dependencies import get_db_session
from generic.sqlmodel.utils import get_obj_by_id_or_404
from generic.storage.depenencies import validate_image
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
    "/{user_id}/avatar/",
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
    user_id: int,
    img: UploadFile = Depends(validate_image()),
    session: AsyncSession = Depends(get_db_session),
):
    user = await get_obj_by_id_or_404(User, user_id, session)
    if img:
        rename_uploadfile(img, new_name=f"avatar_{user.id}")
    user.avatar = img or User.avatar.default.arg
    session.add(user)
    await session.commit()
    await session.refresh(user)
    return user
