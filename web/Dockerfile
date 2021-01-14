# build
FROM node:14-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

# run
FROM nginx:alpine as run
COPY --from=build /app/build /usr/share/nginx/html
