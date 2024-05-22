from typing import Optional, Tuple
from urllib.parse import urlencode, urljoin

import jinja2
from auth.models import User
from auth.schemas import SuperUserCreate
from fastapi import Request
from fastapi_users import BaseUserManager, IntegerIDMixin
from fastapi_users.exceptions import InvalidPasswordException, UserNotExists
from generic.config import EMAIL_DIR, settings
from generic.tasks import send_email
from generic.utils import build_parametrized_url


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

    async def _get_or_create_by_email(self, email: str, defaults: dict, safe: bool = True) -> Tuple[User, bool]:
        try:
            user = await self.get_by_email(email)
            created = False
        except UserNotExists:
            defaults["email"] = email
            user_dict = SuperUserCreate(**defaults)
            user = await self.create(user_create=user_dict, safe=safe)
            created = True
        return user, created

    async def get_or_create_deleted(self) -> Tuple[User, bool]:
        user, created = await self._get_or_create_by_email(
            "deleted@mushai.com",
            defaults={
                "password": self.password_helper.generate(),
                "is_superuser": False,
                "is_staff": True,
                "is_verified": True,
                "is_active": True,
                "name": "Deleted",
                "surname": "Account",
            },
            safe=False,
        )
        return user, created

    # TODO: Write logger
    async def on_after_register(
        self,
        user: User,
        request: Optional[Request] = None,
    ) -> None:
        if not user.is_verified:  # To prevent UserAlreadyVerified exception when using get_or_create
            await self.request_verify(user, request)
        print(f"User {user.id} has registered.")

    async def on_after_request_verify(
        self,
        user: User,
        token: str,
        request: Optional[Request] = None,
    ) -> None:
        verification_template = self.templateEnv.get_template("verification.html")
        parametrized_url = build_parametrized_url(urljoin(settings.FRONTEND_URL, "verify"), token=token)
        msg_text = verification_template.render(
            name=user.name,
            surname=user.surname,
            verify_url=parametrized_url,
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
        parametrized_url = build_parametrized_url(urljoin(settings.FRONTEND_URL, "reset_password"), token=token)
        msg_text = forgot_template.render(
            name=user.name,
            surname=user.surname,
            reset_password_url=parametrized_url,
        )
        send_email(to_email=user.email, message=msg_text, subject="Reset password in MushAI")
        print(f"Reseting password requested for user {user.id}. Verification token: {token}")
