#!/bin/sh
docker run -d \
    -p 6432:5432 \
    --name my-pg-db \
    --env-file '.env' \
    postgres:16
