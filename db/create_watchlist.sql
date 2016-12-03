CREATE TABLE watchlist (
  id SERIAL PRIMARY KEY NOT NULL,
  title TEXT NOT NULL,
  runtime INT,
  release TEXT,
  poster TEXT,
  mdb_id TEXT UNIQUE,
  imdb_id TEXT UNIQUE,
  FOREIGN KEY (fb_id) REFERENCES users(fb_id)
);
