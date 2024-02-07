from email.mime.text import MIMEText
from typing import Sequence

from dependencies import get_smtp_server
from pydantic import EmailStr


def send_email(to_email: EmailStr | Sequence[EmailStr], message: str | MIMEText):
    if not message:
        raise ValueError("Message cannot be empty!")
    with get_smtp_server() as smtp:
        smtp.sendmail(msg=message, from_addr=smtp.user, to_addrs=to_email)
