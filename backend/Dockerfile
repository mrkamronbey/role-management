FROM node:24-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl

COPY package.json package-lock.json prisma.config.ts ./
COPY prisma ./prisma
RUN npm ci

COPY . .
RUN npm run build

FROM node:24-alpine
WORKDIR /app
RUN apk add --no-cache openssl

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/src/generated ./src/generated
COPY package.json prisma.config.ts ./
COPY prisma ./prisma

EXPOSE 3000
CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && exec node dist/main"]
