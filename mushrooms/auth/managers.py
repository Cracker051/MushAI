from typing import Optional
from urllib.parse import urljoin

import jinja2
from auth.models import User
from fastapi import Request
from fastapi_users import BaseUserManager, IntegerIDMixin
from fastapi_users.exceptions import InvalidPasswordException
from generic.config import EMAIL_DIR, settings
from generic.tasks import send_email


class UserManager(IntegerIDMixin, BaseUserManager[User, int]):
    reset_password_token_secret = settings.APP_SECRET
    verification_token_secret = settings.APP_SECRET

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        self.templateLoader = jinja2.FileSystemLoader(searchpath=EMAIL_DIR)
        self.templateEnv = jinja2.Environment(loader=self.templateLoader)

    async def validate_password(self, password: str, user: User) -> None:
        if len(password) < 8:
            raise InvalidPasswordException("Password must have at least 8 characters")

    # TODO: Write logger
    async def on_after_register(
        self,
        user: User,
        request: Optional[Request] = None,
    ) -> None:
        await self.request_verify(user, request)
        print(f"User {user.id} has registered.")

    async def on_after_forgot_password(
        self,
        user: User,
        token: str,
        request: Optional[Request] = None,
    ) -> None:
        print(f"User {user.id} has forgot their password. Reset token: {token}")

    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Optional[Request] = None,
    ) -> None:
        verification_template = self.templateEnv.get_template("verification.html")
        msg_text = verification_template.render(
            name=user.name,
            surname=user.surname,
            verify_url=urljoin(
                settings.FRONTEND_URL,
                "verify/",
            ),
            token_value=token,
        )
        send_email(to_email=user.email, message=msg_text, subject="Registration in MushAI")
        print(f"Verification requested for user {user.id}. Verification token: {token}")

    async def on_after_forgot_password(
        self,
        user: User,
        token: str,
        request: Optional[Request] = None,
    ) -> None:
        forgot_template = self.templateEnv.get_template("forget_password.html")
        msg_text = forgot_template.render(
            name=user.name,
            surname=user.surname,
            reset_password_url=urljoin(
                settings.FRONTEND_URL,
                "reset_password/",
            ),
            token_value=token,
        )
        send_email(to_email=user.email, message=msg_text, subject="Reset password in MushAI")
        print(f"Reseting password requested for user {user.id}. Verification token: {token}")
