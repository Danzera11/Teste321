FROM node:22-alpine AS base
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY prisma ./prisma
RUN npx prisma generate

COPY src ./src

ENV NODE_ENV=production
CMD ["node", "src/server.js"]
