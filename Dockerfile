FROM node:22-alpine3.19 AS builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

FROM node:22-alpine3.19 AS runtime

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/.next ./.next
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/package*.json ./

EXPOSE 3000

RUN addgroup -S nextjs && adduser -S nextjs -G nextjs
USER nextjs

CMD ["npm", "run", "start"]

