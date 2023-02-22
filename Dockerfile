FROM node:18
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
COPY . .
RUN npm install
ENV NODE_ENV=production
ENV PORT 8080
EXPOSE 8080
CMD ["node", "./server/index.js"]