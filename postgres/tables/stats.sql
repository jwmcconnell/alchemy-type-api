BEGIN TRANSACTION;

CREATE TABLE stats (
    user_id int NOT NULL,
    passages int NOT NULL,
    avg_wpm float NOT NULL,
    avg_errors float NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

COMMIT;