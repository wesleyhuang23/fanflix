SELECT * FROM users
WHERE LOWER(name) LIKE '%' || $1 || '%';