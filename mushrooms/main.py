from auth import routers as auth_routers
from blog import routers as blog_routers
from fastapi import FastAPI
from fastapi.responses import RedirectResponse

if __name__ == "main":
    app = FastAPI()

    @app.get("/", include_in_schema=False)
    async def swagger_redirect():
        return RedirectResponse("/docs/")

    app.include_router(
        auth_routers.auth_router,
        prefix="/auth/jwt",
        tags=["auth"],
    )

    app.include_router(
        auth_routers.register_router,
        prefix="/auth",
        tags=["auth"],
    )

    app.include_router(
        auth_routers.verify_router,
        prefix="/auth",
        tags=["auth"],
    )

    app.include_router(
        auth_routers.users_router,
        prefix="/users",
        tags=["users"],
    )

    app.include_router(
        auth_routers.reset_password_router,
        prefix="/auth/password",
        tags=["auth"],
    )

    app.include_router(
        blog_routers.blog_router,
        prefix="/blog",
        tags=["blog"],
    )

    app.include_router(
        blog_routers.comment_router,
        prefix="/comment",
        tags=["comment"],
    )
