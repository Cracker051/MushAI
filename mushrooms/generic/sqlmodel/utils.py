from typing import Any, Type, TypeVar

from fastapi import HTTPException, status
from fastapi.exceptions import HTTPException
from generic.sqlmodel.models import BaseSQLModel
from sqlalchemy.exc import DBAPIError
from sqlalchemy.orm.exc import NoResultFound
from sqlmodel import column, literal, select, table
from sqlmodel.ext.asyncio.session import AsyncSession


def process_sa_exception(exc: DBAPIError) -> str:
    exception_msg = repr(exc)
    if idx := exception_msg.find("DETAIL:"):
        return exception_msg[idx:]
    return exception_msg


T = TypeVar("T", bound=BaseSQLModel)


async def check_foreign_keys(instance: T, session: AsyncSession) -> None:
    for table_column, foreign_table_column in instance.foreign_keys.items():
        f_table, f_column = foreign_table_column.split(".")
        if (value := getattr(instance, table_column)) is None:
            continue
        is_exists = (
            await session.exec(
                select(literal(1))
                .select_from(table(f_table))
                .where(column(f_column) == value)
                .limit(1)
            )
        ).first()
        if not is_exists:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Row of table `{f_table}` with `{f_column}` = {value} not found!",
            )


def generate_readonly_kwargs(columns: list) -> dict:
    access_dict = {"disabled": True}
    return {column: access_dict for column in columns}


def model_relationships_columns(model: BaseSQLModel) -> list:
    return model.__mapper__.relationships.keys()


async def get_obj_by_id_or_404(
    model: Type[BaseSQLModel], id: Any, session: AsyncSession
) -> T:
    try:
        obj = await session.get_one(model, id)
    except NoResultFound:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{model.__name__} with id = {id} not found!",
        )
    return obj
