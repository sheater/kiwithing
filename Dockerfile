FROM node:6.9.1

RUN npm install http-server -g

COPY ./dist ./
COPY ./server.sh ./

EXPOSE 80

CMD "./server.sh"
