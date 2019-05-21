BEGIN TRANSACTION;

INSERT into users (name, email, joined) 
values ('john', 'john@gmail.com', '2018-01-01');
INSERT into login (hash, email) 
values ('$2a$10$0umiOSkXu//nmGjZxQZr9OEix8a89OjRRLA/PCFZJbOpN/juGpkAu', 'john@gmail.com');

INSERT into passages (title, passage_text, passage_description, created) 
values ('Javascript Functions', 'Practice typing Javascript functions!', 'This is a test passage.', '2018-01-01');

COMMIT;