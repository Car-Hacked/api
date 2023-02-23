FROM node:18
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY . .
RUN npm install
ENV NODE_ENV=production
EXPOSE 3000
ENV PORT 3000
CMD ["node", "./server/index.js"]