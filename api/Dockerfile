# build
FROM node:14-alpine as build
WORKDIR /app

COPY package*.json ./
RUN npm ci --silent

COPY . .

# run
FROM node:14-alpine as run
WORKDIR /app

COPY --from=build /app .

CMD [ "node", "app.js" ]
