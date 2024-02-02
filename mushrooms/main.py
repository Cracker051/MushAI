from auth import routers as auth_routers
from blog.routers import router as blog_router
from fastapi import FastAPI

app = FastAPI()


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
    blog_router,
    prefix="/blog",
    tags=["blog"],
)
