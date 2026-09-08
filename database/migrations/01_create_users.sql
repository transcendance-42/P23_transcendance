CREATE TABLE IF NOT EXISTS users 
(
    id BIGSERIAL PRIMARY KEY,
    is_active BOOLEAN NOT NULL DEFAULT true,
    email VARCHAR(100) NOT NULL UNIQUE, 
    password_hash VARCHAR(255), 
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR (50) NOT NULL, 
    city VARCHAR(100) NOT NULL, 
    date_of_birth DATE NOT NULL, 
    avatar VARCHAR(500),
    created_at TIMESTAMP DEFAULT NOW()
);
 