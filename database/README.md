# Database

## Why PostgreSQL?

PostgreSQL is an open-source, free, and production-grade relational database. We chose it for our project for the following reasons:

- **Advanced types** — supports UUID, JSON, arrays, and all standard SQL types
- **Foreign keys** — handles complex relationships between tables (users → dogs → matches → messages)
- **Reliability** — used in production by companies like Instagram, Spotify, and Reddit
- **Prisma compatible** — works seamlessly with the ORM used by our backend
- **Extensible** — supports PostGIS for geolocation features if needed in the future


## Tables structures 

### `users`
Stores owner accounts.

| Column         | Type           | Constraints              |
|----------------|----------------|--------------------------|
| id             | BIGSERIAL      | PRIMARY KEY              |
| email          | VARCHAR(100)   | NOT NULL, UNIQUE         |
| password_hash  | VARCHAR(255)   |                          |
| first_name     | VARCHAR(50)    | NOT NULL                 |
| last_name      | VARCHAR(50)    | NOT NULL                 |
| city           | VARCHAR(100)   | NOT NULL                 |
| date_of_birth  | DATE           | NOT NULL                 |
| avatar         | VARCHAR(500)   |                          |
| created_at     | TIMESTAMP      | DEFAULT NOW()            |

---

### `dogs`
Stores dog profiles linked to their owner.

| Column     | Type         | Constraints                        |
|------------|--------------|------------------------------------|
| id         | BIGSERIAL    | PRIMARY KEY                        |
| owner_id   | BIGINT       | NOT NULL, REFERENCES users(id)     |
| dog_name   | VARCHAR(50)  | NOT NULL                           |
| breed      | VARCHAR(50)  |                                    |
| age        | INT          |                                    |
| size       | VARCHAR(20)  |  ('small', 'medium', or 'large')   |
| bio        | TEXT         |                                    |
| created_at | TIMESTAMP    | DEFAULT NOW()                      |

---

### `dog_pics`
Stores photo paths for each dog profile.

| Column    | Type         | Constraints                      |
|-----------|--------------|----------------------------------|
| id        | BIGSERIAL    | PRIMARY KEY                      |
| dog_id    | BIGINT       | NOT NULL, REFERENCES dogs(id)    |
| file_path | VARCHAR(500) | NOT NULL                         |
| position  | INT          |                                  |

---

### `swipes`
Records every swipe action between two dogs.

| Column        | Type      | Constraints                   |
|---------------|-----------|-------------------------------|
| id            | BIGSERIAL | PRIMARY KEY                   |
| swiper_dog_id | BIGINT    | NOT NULL, REFERENCES dogs(id) |
| swiped_dog_id | BIGINT    | NOT NULL, REFERENCES dogs(id) |
| direction     | VARCHAR(7)| NOT NULL, CHECK ('like','pass')|
| created_at    | TIMESTAMP | DEFAULT NOW()                 |

---

### `matches`
Created when two dogs have mutually liked each other.

| Column     | Type      | Constraints                   |
|------------|-----------|-------------------------------|
| id         | BIGSERIAL | PRIMARY KEY                   |
| id_dog1    | BIGINT    | NOT NULL, REFERENCES dogs(id) |
| id_dog2    | BIGINT    | NOT NULL, REFERENCES dogs(id) |
| created_at | TIMESTAMP | DEFAULT NOW()                 |

---

### `messages`
Stores the chat history between two owners after a match.

| Column    | Type      | Constraints                      |
|-----------|-----------|----------------------------------|
| id        | BIGSERIAL | PRIMARY KEY                      |
| match_id  | BIGINT    | NOT NULL, REFERENCES matches(id) |
| sender_id | BIGINT    | NOT NULL, REFERENCES users(id)   |
| content   | TEXT      | NOT NULL                         |
| sent_at   | TIMESTAMP | DEFAULT NOW()                    |


## Table Relations

```
users ──────────── dogs
                    │
                dog_pics
                    │
              ┌─── swipes ───┐
              │               │
           matches
              │
           messages ──── users
```

- A `user` owns one or more `dogs`
- A `dog` can swipe other `dogs` (stored in `swipes`)
- A `match` is created when two dogs mutually like each other
- A `match` generates a conversation stored in `messages`
- A `message` is sent by a `user` (the owner), not the dog



## How to run the database?

**Create all tables:**
```bash
cd database
psql -d test -f init.sql
```

**Insert test data:**
```bash
psql -d test -f seeds/seed.sql
```

**Verify tables exist:**
```bash
psql -d test
\d
```

### Folder structure 
```
database/
├── migrations/
│   ├── 001_create_users.sql
│   ├── 002_create_dogs.sql
│   ├── 003_create_dog_pics.sql
│   ├── 004_create_swipes.sql
│   ├── 005_create_matches.sql
│   └── 006_create_messages.sql
├── seeds/
│   └── seed.sql
├── init.sql
└── README.md
```
## Sources 

SQL basic 
https://sqlbolt.com/

PostgreSQL Official documentation 
https://www.postgresql.org/docs/

PostgreSQL for beginners (youtube) 
https://www.youtube.com/watch?v=qw--VYLpxG4&t=593s