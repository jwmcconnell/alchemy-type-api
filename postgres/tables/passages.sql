BEGIN TRANSACTION;

CREATE TABLE passages (
    id serial PRIMARY key,
    title VARCHAR(200),
    content text UNIQUE NOT NULL,
    description text,
    created TIMESTAMP NOT NULL
);

COMMIT;