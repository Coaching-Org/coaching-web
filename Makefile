include .env

export EXPOSED_PORT ?= 3001
export DOCKER_IMAGE = coaching-frontend:$(shell git rev-parse --short HEAD)

docker-build:
	docker build -f .docker/Dockerfile -t $(DOCKER_IMAGE) .

docker-deploy:
	docker stack deploy -c .docker/docker-compose.yml coaching-service-frontend-$(ENV)

.PHONY:
	docker-build
	docker-deploy