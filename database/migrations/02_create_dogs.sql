CREATE TABLE IF NOT EXISTS dogs (
    id BIGSERIAL PRIMARY KEY,
    owner_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE, 
    dog_name VARCHAR(50) NOT NULL,
    gender VARCHAR (50) CHECK (gender IN ('Male', 'Female', 'Other')),
    breed VARCHAR(50), 
    age INT,
    size VARCHAR(20) CHECK (size IN ('Small', 'Medium', 'Large')), 
    bio TEXT NOT NULL, 
    created_at TIMESTAMP DEFAULT NOW()
);