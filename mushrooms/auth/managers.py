from typing import Optional

from auth.models import User
from config import settings
from fastapi import Request
from fastapi_users import BaseUserManager, IntegerIDMixin


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.APP_SECRET
    verification_token_secret = settings.APP_SECRET

    async def on_after_register(self, user: User, request: Optional[Request] = None):
        breakpoint()
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"Verification requested for user {user.id}. Verification token: {token}")
