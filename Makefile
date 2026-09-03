all: up

up:
	docker-compose build --no-cache
	docker compose up -d -V

down:
	docker-compose down

re: down up

clean: down
	docker-compose down 

fclean:
	docker-compose down -v
	docker system prune -af --volumes

logs:
	docker-compose logs -f

ps:
	docker-compose ps

.PHONY: all up down re clean fclean logs ps