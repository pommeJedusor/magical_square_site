FROM node:22-alpine3.19 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build


FROM nginx:alpine

COPY --from=builder /app/out ./usr/share/nginx/html
COPY ./favicon.ico ./usr/share/nginx/html/favicon.ico

COPY default.conf /etc/nginx/conf.d/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
