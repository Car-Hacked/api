FROM node:18.14 AS dependencies
WORKDIR /home/app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

FROM node:18 AS runner
WORKDIR /home/app

COPY . .
COPY --from=dependencies /home/app/node_modules ./node_modules
COPY --from=dependencies /home/app/package.json /home/app


ENV NODE_ENV="production"
EXPOSE 3000
ENV PORT 3000


CMD ["npm", "start"]