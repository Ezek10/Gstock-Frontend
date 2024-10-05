FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 80
RUN npm install
CMD ["npm", "run", "dev"]
