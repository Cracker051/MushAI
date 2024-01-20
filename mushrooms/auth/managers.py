from typing import Optional

from auth.models import User
from config import settings
from fastapi import Request
from starlette.background import BackgroundTask
from fastapi_users import BaseUserManager, IntegerIDMixin
from tasks import send_email


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.APP_SECRET
    verification_token_secret = settings.APP_SECRET

    # TODO: Write logger
    async def on_after_register(self, user: User, request: Optional[Request] = None):
        breakpoint()
        await self.request_verify(user, request)
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self, user: User, token: str, request: Optional[Request] = None
    ):
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    # TODO: Can I switch it to FastAPI Background Tasks?
    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Optional[Request] = None,
    ):
        BackgroundTask(
            send_email,
            email=user.email,
            message="test",
        )
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    @property
    def verifying_text(self):
        return """test {name}"""
