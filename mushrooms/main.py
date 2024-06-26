from fastapi.staticfiles import StaticFiles

from auth import routers as auth_routers
from blog import routers as blog_routers
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import RedirectResponse
from fastapi_pagination import add_pagination
from generic.config import ALLOWED_ORIGINS
from generic.database import engine
from auth.dependecies import request_user
from prediction.routers import prediction_router
from sqladmin import Admin

from auth import admin as auth_admin  # isort: skip
from blog import admin as blog_admin  # isort: skip

app = FastAPI(dependencies=[Depends(request_user)])
app.mount("/static", StaticFiles(directory="static"), name="static")

admin = Admin(app, engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/", include_in_schema=False)
async def swagger_redirect() -> RedirectResponse:
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
    auth_routers.shared_router,
    prefix="/shared/users",
    tags=["shared", "users"],
)

app.include_router(
    auth_routers.reset_password_router,
    prefix="/auth/password",
    tags=["auth"],
)

app.include_router(
    auth_routers.avatar_router,
    prefix="/users",
    tags=["users"],
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

app.include_router(
    prediction_router,
    prefix="/prediction",
    tags=["prediction"],
)

admin.add_view(auth_admin.UserAdmin)

admin.add_view(blog_admin.BlogAdmin)

admin.add_view(blog_admin.CommentAdmin)

add_pagination(app)
