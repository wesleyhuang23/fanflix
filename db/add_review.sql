UPDATE reviews
SET tagline = $1, author = $2, rating = $3, review = $4
WHERE mdb_id = $5 AND fb_id = $6;
