SELECT users.id, title, name, users.fb_id, tagline, mdb_id, review, poster, photo, rating FROM reviews
JOIN users ON reviews.fb_id = users.fb_id
WHERE mdb_id = $1;
