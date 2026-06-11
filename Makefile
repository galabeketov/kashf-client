CURRENT_DIR=$(shell pwd)

APP=$(shell basename ${CURRENT_DIR})

APP_CMD_DIR=${CURRENT_DIR}/cmd

PROJECT_NAME=${PROJECT_NAME}
REGISTRY=${REGISTRY}
TAG=latest
ENV_TAG=latest

clear:
	rm -rf ${CURRENT_DIR}/bin/*

build-image-test:
	docker build --platform=linux/amd64 --rm -t ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG} -f ./Dockerfile . 
	docker tag ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG} ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}

push-image:
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}:${TAG}
	docker push ${REGISTRY}/${PROJECT_NAME}/${APP}:${ENV_TAG}

export-data:
	export CI_REGISTRY=registry.gitlab-dev.soliqservis.uz:5005 && export CI_PROJECT_NAMESPACE=front-office && export CI_PIPELINE_IID=92

