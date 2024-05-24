#!/bin/sh
uvicorn main:app \
    --app-dir mushrooms \
    --reload-dir mushrooms \
    --reload \
    --host 127.0.0.1 \
    --port 8080