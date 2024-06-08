FROM node:20
WORKDIR /app
COPY ./express /app
COPY ./express/package.json /app
COPY ./express/yarn.lock /app
RUN npm run install
EXPOSE 8000
CMD [ "npm", "run", "start" ]
