FROM node:alpine

WORKDIR /usr/devops-lab/microservice-demo/api-gateway

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
