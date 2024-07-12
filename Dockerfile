FROM node:22-bullseye

WORKDIR /frontend

ENV LANG C.UTF-8

RUN apt-get update && apt-get install -y \
    vim \
    curl \
    git && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

USER node