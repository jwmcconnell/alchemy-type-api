BEGIN TRANSACTION;

INSERT into users (name, email, joined) 
values ('john', 'john@gmail.com', '2018-01-01');
INSERT into login (hash, email) 
values ('$2a$10$0umiOSkXu//nmGjZxQZr9OEix8a89OjRRLA/PCFZJbOpN/juGpkAu', 'john@gmail.com');
INSERT into stats (user_id, passages, avg_wpm, avg_errors)
values ('1', '0', '0', '0');

INSERT into passages (title, content, description, created) 
values ('Javascript Functions', 'This is a test passage.'||E'\n'||'This is a second line.', 'Practice typing Javascript functions!', '2018-01-01');

COMMIT;