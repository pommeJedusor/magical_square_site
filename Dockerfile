FROM node:22-alpine3.19

WORKDIR /usr/src/app

COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npx prisma generate
RUN npm run build

CMD ["npm", "run", "start"]
