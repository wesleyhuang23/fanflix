UPDATE reviews
SET tagline = $1, author = $2, review = $3
WHERE mdb_id = $4 AND fb_id = $5;
