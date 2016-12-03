CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  poster TEXT NOT NULL,
  mdb_id TEXT UNIQUE,
  tagline TEXT,
  author TEXT,
  review TEXT,
  fb_id TEXT,
  FOREIGN KEY (fb_id) REFERENCES users(fb_id)
);
