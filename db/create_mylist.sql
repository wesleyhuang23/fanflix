CREATE TABLE mylist (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  runtime INT,
  release TEXT,
  poster TEXT,
  status INT,
  plot TEXT,
  mdb_id TEXT UNIQUE,
  imdb_id TEXT UNIQUE
)
