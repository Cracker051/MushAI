CREATE TABLE auth_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    is_staff BOOLEAN NOT NULL DEFAULT FALSE,
    avatar TEXT
)