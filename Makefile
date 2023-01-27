run:
	docker run -d -p 8080:8080 --env-file ./.env --name backend backend:env
