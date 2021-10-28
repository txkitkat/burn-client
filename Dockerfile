FROM node:14-alpine
WORKDIR /app
ENV REACT_APP_FIRE_BACKEND="http://20.112.76.241:8080"
RUN npm install -g serve
COPY build ./build
EXPOSE 5000
CMD [ "serve", "-s", "build" ]