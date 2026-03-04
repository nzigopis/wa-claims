# --- build stage ---
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN echo "=== /app contents ===" && ls -la /app && echo "=== /app/src contents ===" && ls -la /app/src || echo "src dir missing!"

RUN npm run build

# --- runtime stage ---
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/index.js"]
