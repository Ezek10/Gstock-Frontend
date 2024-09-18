.PHONY: help run  black flake pylint test docker-up


help:
	@echo "docker-push: push docker to dockerhub"

docker-push:
	git pull
	docker build -t ezemarcel/gstock-front-app:1.0 .
	docker push ezemarcel/gstock-front-app:1.0
