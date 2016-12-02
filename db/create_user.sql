CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  fb_id TEXT UNIQUE,
  photo TEXT,
  name TEXT,
  provider TEXT
);
