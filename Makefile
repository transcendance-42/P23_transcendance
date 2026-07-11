all: up

up:
	docker-compose up --build -d

down:
	docker-compose down

re: down up

clean: down
	docker-compose down -v

fclean: clean
	docker system prune -af

logs:
	docker-compose logs -f

ps:
	docker-compose ps

.PHONY: all up down re clean fclean logs ps