CREATE TABLE auth_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    hashed_password TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_staff BOOLEAN NOT NULL DEFAULT FALSE,
    is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    avatar TEXT DEFAULT NULL
);

CREATE TABLE mushroom_blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INTEGER NOT NULL REFERENCES auth_user(id),
    content TEXT NOT NULL
);

CREATE TABLE mushroom_comment (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES mushroom_comment(id),
    user_id INTEGER REFERENCES auth_user(id),
    blog_id INTEGER NOT NULL REFERENCES mushroom_blog(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    body VARCHAR(200)
);