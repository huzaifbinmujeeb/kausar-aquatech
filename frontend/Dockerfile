FROM node:20-slim

WORKDIR /app

COPY package.json ./
RUN yarn install --ignore-engines

COPY . .

EXPOSE 3000

ENV WDS_SOCKET_PORT=0

CMD ["yarn", "start"]
