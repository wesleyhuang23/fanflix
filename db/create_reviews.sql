CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  poster TEXT NOT NULL,
  mdb_id TEXT UNIQUE,
  tagline TEXT,
  author TEXT,
  review TEXT,
  FOREIGN KEY (mdb_id) REFERENCES mylist(mdb_id)
);
