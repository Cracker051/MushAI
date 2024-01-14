#!/bin/sh
uvicorn main:app \
    --app-dir ./mushrooms \
    --reload-dir ./mushrooms \
    --reload \
    --port 8080 \
