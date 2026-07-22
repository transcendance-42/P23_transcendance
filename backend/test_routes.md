# Test des routes API 

## Dogs
```bash
# Lister tous les chiens
curl http://localhost:3000/api/dogs
 
# Récupérer un chien par id
curl http://localhost:3000/api/dogs/1
 
# Créer un chien
curl -X POST http://localhost:3000/api/dogs \
  -H "Content-Type: application/json" \
  -d '{"owner_id": 1, "dog_name": "TestDog", "bio": "Hello!", "gender": "Male", "size": "Small"}'
 
# Modifier un chien 
curl -X PUT http://localhost:3000/api/dogs/3 \
  -H "Content-Type: application/json" \
  -d '{"bio": "Updated bio"}'
 
# Supprimer un chien
curl -X DELETE http://localhost:3000/api/dogs/3
```

## Dog Pics 

```bash
# Ajouter une photo à un chien
curl -X POST http://localhost:3000/api/dog-pics \
  -H "Content-Type: application/json" \
  -d '{"dog_id": 1, "file_path": "/uploads/surf.jpg", "position": 1}'
 
# Récupérer toutes les photos d'un chien
curl http://localhost:3000/api/dog-pics/1
 
# Supprimer une photo par son id
curl -X DELETE http://localhost:3000/api/dog-pics/1
```

## Swipes

```bash
# Swipe right & right = MATCH (matched: true)
curl -X POST http://localhost:3000/api/swipes \
  -H "Content-Type: application/json" \
  -d '{"swiper_dog_id": 3, "swiped_dog_id": 4, "direction": "right"}'
 
curl -X POST http://localhost:3000/api/swipes \
  -H "Content-Type: application/json" \
  -d '{"swiper_dog_id": 4, "swiped_dog_id": 3, "direction": "right"}'
 
# Swipe left & left = pas de match (matched: false)
curl -X POST http://localhost:3000/api/swipes \
  -H "Content-Type: application/json" \
  -d '{"swiper_dog_id": 5, "swiped_dog_id": 6, "direction": "left"}'
 
curl -X POST http://localhost:3000/api/swipes \
  -H "Content-Type: application/json" \
  -d '{"swiper_dog_id": 6, "swiped_dog_id": 5, "direction": "left"}'
 
# Swipe asymétrique = pas de match (matched: false)
curl -X POST http://localhost:3000/api/swipes \
  -H "Content-Type: application/json" \
  -d '{"swiper_dog_id": 7, "swiped_dog_id": 8, "direction": "right"}'
 
curl -X POST http://localhost:3000/api/swipes \
  -H "Content-Type: application/json" \
  -d '{"swiper_dog_id": 8, "swiped_dog_id": 7, "direction": "left"}'
```


## Matches 

```bash
# Récupérer tous les matches d'un user
curl http://localhost:3000/api/matches/1
 
# Supprimer un match par son id
curl -X DELETE http://localhost:3000/api/matches/1
```

## Messages

```bash
# Récupérer l'historique d'un match (remplace 1 par un matchId existant)
curl http://localhost:3000/api/messages/1
 
# Envoyer un message (remplace match_id par un id existant)
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{"match_id": 1, "sender_id": 1, "content": "Woof!"}'
 
# Supprimer un message par son id
curl -X DELETE http://localhost:3000/api/messages/1
```

## users

```bash
# Lister tous les users (password_hash masqué)
curl http://localhost:3000/users
```

## health check 

```bash
curl http://localhost:3000/health
```