from email.mime.text import MIMEText
import smtplib
from fastapi import Depends
from pydantic import EmailStr
from typing import Sequence


# TODO: Fix code smell (Try not to use workaround to avoid circular dependencies)
# DEBUG: Divide dependencies to main dependecies and shared dependencies?
class SMTPServer:
    def __call__(self):
        from dependencies import get_smtp_server

        return get_smtp_server


smtp = SMTPServer()


def send_email(
    to_email: EmailStr | Sequence[EmailStr],
    message: str | MIMEText,
    smtp: smtplib.SMTP = Depends(smtp),
):
    if not message:
        raise ValueError("Message cannot be empty!")
    smtp.send_message(msg=message, from_addr=smtp.user, to_addrs=to_email)
