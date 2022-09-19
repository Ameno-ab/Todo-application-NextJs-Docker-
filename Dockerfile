FROM node:16-alpine


WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY next.config.js ./next.config.js



CMD ["npm" , "run" , "dev"]