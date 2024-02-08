from sqlalchemy.exc import SQLAlchemyError


def process_sa_exception(exc: SQLAlchemyError) -> str:
    exception_msg = repr(exc)
    if idx := exception_msg.find("DETAIL:"):
        return exception_msg[idx:]
    return exception_msg
