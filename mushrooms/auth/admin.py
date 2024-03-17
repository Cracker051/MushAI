from auth.models import User
from generic.sqlmodel.utils import generate_readonly_kwargs, model_relationships_columns
from sqladmin import ModelView


class UserAdmin(ModelView, model=User):
    column_list = [User.id, User.email]
    column_details_exclude_list = [
        *model_relationships_columns(User),
        User.hashed_password,
    ]
    form_excluded_columns = column_details_exclude_list
    form_widget_args = generate_readonly_kwargs(["email", "is_superuser"])
    can_create = False
