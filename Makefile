all: up

up: certs
	docker-compose build --no-cache
	docker-compose up -d -V

dev: certs
	docker-compose build
	FRONT_MODE=dev docker-compose up -d -V

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
	@mkdir -p certs
	@IP=$$(hostname -I | awk '{print $$1}'); \
	echo "Generating SSL certificate for localhost and $$IP"; \
	openssl req -x509 -newkey rsa:2048 -nodes \
		-keyout certs/local-key.pem \
		-out certs/local.pem \
		-days 365 \
		-subj "/CN=localhost" \
		-addext "subjectAltName=DNS:localhost,IP:127.0.0.1,IP:$$IP"

.PHONY: all up dev down re clean fclean logs ps