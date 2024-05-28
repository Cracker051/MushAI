CREATE TABLE auth_user (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    surname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    hashed_password TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_staff BOOLEAN NOT NULL DEFAULT FALSE,
    is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    is_subscriber BOOLEAN NOT NULL DEFAULT FALSE,
    avatar TEXT DEFAULT 'default.webp' NOT NULL
);

CREATE TABLE mushroom_blog (
    id SERIAL PRIMARY KEY,
    title VARCHAR(50) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    user_id INTEGER NOT NULL REFERENCES auth_user(id),
    content TEXT NOT NULL,
    is_draft BOOLEAN NOT NULL DEFAULT TRUE,
    icon TEXT DEFAULT 'default.webp' NOT NULL
);
CREATE INDEX mushroom_blog_user_id_idx ON mushroom_blog(user_id);

CREATE TABLE mushroom_comment (
    id SERIAL PRIMARY KEY,
    parent_id INTEGER REFERENCES mushroom_comment(id),
    user_id INTEGER REFERENCES auth_user(id),
    blog_id INTEGER NOT NULL REFERENCES mushroom_blog(id),
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    body VARCHAR(200)
);
CREATE INDEX mushroom_comment_user_id_idx ON mushroom_comment(user_id);

-- Seeding
INSERT INTO auth_user (name, surname, email, hashed_password, is_active, is_staff, is_superuser, is_verified)
VALUES 
    ('Dmytro', 'Lavreniuk', 'dmytro@example.com', 'hashed_password_1', TRUE, TRUE, FALSE, TRUE),
    ('Petro', 'Kozar', 'petro@example.com', 'hashed_password_2', TRUE, FALSE, FALSE, TRUE),
    ('George', 'Unguryan', 'george@example.com', 'hashed_password_3', TRUE, FALSE, FALSE, TRUE);

INSERT INTO mushroom_blog (title, user_id, content, is_draft)
VALUES 
    ('Mushrooms and how this works', 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', FALSE),
    ('Hypnotic mushrooms', 2, 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', FALSE),
    ('Don`t believe the color of mushrooms', 1, '[h1]Lorem ipsum[/h1] Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', TRUE);

INSERT INTO mushroom_comment (parent_id, user_id, blog_id, body)
VALUES 
    (NULL, 2, 1, 'This is a wonderful post!'),
    (NULL, 3, 1, 'Very interestingly written.'),
    (1, 1, 1, 'Thank you for your feedback!'),
    (NULL, 1, 2, 'This is also very interesting.'),
    (NULL, 3, 3, 'Here is an interesting perspective on the topic.');