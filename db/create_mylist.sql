CREATE TABLE mylist (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  runtime INT,
  release TEXT,
  poster TEXT,
  status INT,
  plot TEXT,
  mdb_id TEXT,
  imdb_id TEXT,
  FOREIGN KEY (fb_id) REFERENCES users(fb_id)
)
