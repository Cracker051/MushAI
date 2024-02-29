from typing import Type

from fastapi import status
from fastapi.exceptions import HTTPException
from generic.sqlmodel.models import BaseSQLModel
from sqlalchemy.exc import SQLAlchemyError
from sqlmodel import column, literal, select, table
from sqlmodel.ext.asyncio.session import AsyncSession


def process_sa_exception(exc: SQLAlchemyError) -> str:
    exception_msg = repr(exc)
    if idx := exception_msg.find("DETAIL:"):
        return exception_msg[idx:]
    return exception_msg


async def check_foreign_keys(model: Type[BaseSQLModel], session: AsyncSession):
    for table_column, foreign_table_column in model.foreign_keys.items():
        f_table, f_column = foreign_table_column.split(".")
        if (value := getattr(model, table_column)) is None:
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
