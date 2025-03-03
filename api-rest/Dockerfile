FROM node:alpine

WORKDIR /app

COPY package*.json .

# Actualiza npm
RUN npm install -g npm@latest

# Instala las dependencias
RUN npm install

COPY . .

EXPOSE 5555

CMD ["npm", "start"]