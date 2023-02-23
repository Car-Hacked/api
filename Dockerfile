FROM node:18
WORKDIR /app
COPY ["package.json", "package-lock.json", "."]
COPY . .
RUN npm install
ENV NODE_ENV=production
ENV PORT 3000
EXPOSE 3000
CMD ["node", "./server/index.js"]