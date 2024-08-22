FROM node:22 as build
WORKDIR /app

COPY ./express/package.json /app
COPY ./express/package-lock.json /app
RUN npm install --frozen-lockfile

COPY ./express /app

EXPOSE 8080


