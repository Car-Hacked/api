FROM node:18
WORKDIR /app
COPY package*.json /app
COPY . /app
RUN npm install
RUN npm ci --only=production
CMD ["npm", "start"]