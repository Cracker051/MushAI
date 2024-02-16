from blog.models import Blog
from common.utils import generate_readonly_kwargs, model_relationships_columns
from sqladmin import ModelView


class BlogAdmin(ModelView, model=Blog):
    column_list = [Blog.id, Blog.title]
    column_details_exclude_list = model_relationships_columns(Blog)
    form_excluded_columns = model_relationships_columns(Blog)
    form_widget_args = generate_readonly_kwargs(["user_id", "comments"])
