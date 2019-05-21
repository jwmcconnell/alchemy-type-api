BEGIN TRANSACTION;

CREATE TABLE passages (
    id serial PRIMARY key,
    title VARCHAR(200),
    passage_text text UNIQUE NOT NULL,
    passage_description text,
    created TIMESTAMP NOT NULL
);

COMMIT;