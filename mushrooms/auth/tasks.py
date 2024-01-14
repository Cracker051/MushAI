from email.mime.text import MIMEText
import smtplib
from fastapi import Depends
from dependencies import get_smtp_server


def send_verifying_email(
    email: str,
    message: str | MIMEText,
    smtp: smtplib.SMTP = Depends(get_smtp_server),
):
    smtp.send_message(msg=message, from_addr=smtp.user, to_addrs=email)
