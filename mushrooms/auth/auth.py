import auth.models as auth_models
from auth.dependecies import get_jwt_strategy, get_user_manager
from fastapi_users import FastAPIUsers
from fastapi_users.authentication import AuthenticationBackend, BearerTransport

bearer_transport = BearerTransport(tokenUrl="auth/jwt/login")

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

fastapi_users = FastAPIUsers[auth_models.User, int](
    get_user_manager,
    [auth_backend],
)
