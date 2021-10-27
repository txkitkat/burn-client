FROM node:14-alpine
WORKDIR /app
RUN npm install -g serve
COPY build ./build
EXPOSE 5000
CMD [ "serve", "-s", "build" ]