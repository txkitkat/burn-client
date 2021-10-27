FROM node:14-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g serve
COPY build ./build
EXPOSE 5000
CMD [ "serve", "-s", "build" ]