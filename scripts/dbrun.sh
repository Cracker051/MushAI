#!/bin/sh
docker run -d \
    -p 6432:5432 \
    -v /$(pwd)/scripts/sql/tables.sql:/docker-entrypoint-initdb.d/tables.sql \
    --name my-pg-db \
    --env-file '.env' \
    postgres:16
