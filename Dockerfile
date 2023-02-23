FROM node:18.14-alpine AS dependencies
RUN apk add --no-cache libc6-compat
WORKDIR /home/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

FROM node:18-alpine AS builder
WORKDIR /home/app

COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .

ENV NODE_ENV="production"

FROM node:18-alpine AS runner
WORKDIR /home/app

COPY --from=builder /home/app/server
COPY --from=builder /home/app/public


ENV NODE_ENV="production"
EXPOSE 3000
ENV PORT 3000


CMD ["node", "./server/index.js"]