FROM node:alpine

WORKDIR ./ ./usr/devops-lab/microservice-demo/student-service

COPY ./ ./

RUN npm i

EXPOSE 5001

CMD ["node", "index.js"]