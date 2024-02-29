from blog.models import Blog, Comment
from generic.sqlmodel.utils import generate_readonly_kwargs, model_relationships_columns
from sqladmin import ModelView


class BlogAdmin(ModelView, model=Blog):
    column_list = [Blog.id, Blog.title, Blog.user_id]
    column_details_exclude_list = model_relationships_columns(Blog)
    form_widget_args = generate_readonly_kwargs(["user_id"])


class CommentAdmin(ModelView, model=Comment):
    column_list = [Comment.blog_id, Comment.user_id, Comment.created_at]
    column_details_exclude_list = model_relationships_columns(Comment)
    form_widget_args = generate_readonly_kwargs(["user_id", "comments"])
