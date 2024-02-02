import smtplib
from email.mime.text import MIMEText
from typing import Sequence

from dependencies import get_smtp_server
from fastapi import Depends
from pydantic import EmailStr


def send_email(
    to_email: EmailStr | Sequence[EmailStr],
    message: str | MIMEText,
    smtp: smtplib.SMTP = Depends(get_smtp_server),
):
    if not message:
        raise ValueError("Message cannot be empty!")
    smtp.send_message(msg=message, from_addr=smtp.user, to_addrs=to_email)
