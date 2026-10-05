FROM node:24-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./data ./data
COPY mqtt-listener-app.js .
CMD ["node", "mqtt-listener-app.js", "-f"]
