all: up

up: certs
	docker-compose build --no-cache
	docker-compose up -d -V

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

certs:
	@command -v mkcert >/dev/null || { echo "Installe mkcert d'abord : https://github.com/FiloSottile/mkcert"; exit 1; }
	@mkcert -install
	@mkdir -p certs
	@mkcert -cert-file certs/local.pem -key-file certs/local-key.pem \
		localhost


.PHONY: all up down re clean fclean logs ps