from typing import Optional

from auth.models import User
from common.config import settings
from common.tasks import send_email
from fastapi import Request
from fastapi_users import BaseUserManager, IntegerIDMixin
from fastapi_users.exceptions import InvalidPasswordException


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.APP_SECRET
    verification_token_secret = settings.APP_SECRET

    async def validate_password(self, password: str, user: User) -> None:
        if len(password) < 8:
            raise InvalidPasswordException("Password must have at least 8 characters")

    # TODO: Write logger
    async def on_after_register(self, user: User, request: Optional[Request] = None):
        await self.request_verify(user, request)
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    # TODO: Can I switch it to FastAPI Background Tasks?
    # I must send message with frontend verification link, for example <a>
    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Optional[Request] = None,
    ):
        send_email(to_email=user.email, message="test")
        print(f"Verification requested for user {user.id}. Verification token: {token}")
