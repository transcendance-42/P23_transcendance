-- unused
INSERT INTO users (email, password_hash, first_name, last_name, city, date_of_birth) VALUES
('parissa.chatagny@gmail.com', 'hash23', 'Parissa', 'Chatagny', 'Lausanne', '2000-09-03'),
('dlepore@gmail.com', 'hash23', 'Davide', 'Lepore', 'Renens', '2000-07-15'),
('jonathan.rime@gmail.com', 'hash23', 'Jonathan', 'Rime', 'Lausanne', '1998-11-10'),
('laeti.reyy@gmail.com', 'hash23', 'Laetitia', 'Rey', 'Mont-sur-Lausanne', '2000-10-09'),
('chaely.baudhuin@gmail.com', 'hash23', 'Chaely', 'Baudhuin', 'Gland', '2001-01-10');


INSERT INTO dogs (owner_id, dog_name, breed, gender, age, size, bio) VALUES
(4, 'Surf', 'Berger australien nain', 7, 'Female', 'Small', 'Funny looking but nice I swear, even if he makes a lot of noise'),
(5, 'Joya', 'Labrador', 2, 'Male', 'Large', 'Big dog but really sweet and loves to play');

INSERT INTO swipes (swiper_id, _id, direction) VALUES
(1, 2, 'like'),
(2, 1, 'like');

INSERT INTO matches (id_dog1, id_dog2) VALUES
(1, 2);

INSERT INTO messages (match_id, sender_id, content) VALUES
(1, 4, 'Salut ! Surf adorerait rencontrer Joya !'),
(1, 5, 'Trop bien ! On se retrouve au parc ce weekend ?');