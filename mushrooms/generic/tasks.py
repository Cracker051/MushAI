from email.message import EmailMessage
from email.mime.text import MIMEText
from typing import Sequence

from generic.dependencies import get_smtp_server
from pydantic import EmailStr


def send_email(to_email: EmailStr | Sequence[EmailStr], message: str | MIMEText, subject: str = "MushAI"):
    if not message:
        raise ValueError("Message cannot be empty!")
    with get_smtp_server() as smtp:
        msg = EmailMessage()
        msg["Subject"] = subject
        msg["From"] = smtp.user
        msg["To"] = (to_email,)
        msg.set_content(message, subtype="html")
        smtp.send_message(msg=msg)
