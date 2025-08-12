FROM node:alpine

WORKDIR /usr/devops-lab/microservice-demo/course-service

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5002

CMD ["node", "index.js"]
