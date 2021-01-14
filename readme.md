### Learning server-sent events

Works very well without a proxy. 
Reconnection won't work when using nginx as a reverse proxy.

#### Dependencies
    node 14

#### To run node server and simple html page
    cd api && npm i && npm start
    Open browsers on http://localhost:3001

#### To run with react
    cd web && npm i && npm start
    Open browsers on http://localhost:3000

#### To run with a reverse-proxy
    cd env && docker-compose up --build -d
    Open browsers on http://localhost:3001 or 3000
