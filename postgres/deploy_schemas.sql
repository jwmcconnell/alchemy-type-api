-- Deploy fresh database tables
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/passages.sql'
\i '/docker-entrypoint-initdb.d/tables/stats.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'