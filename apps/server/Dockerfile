FROM node:22-alpine AS builder
WORKDIR /app
ENV HUSKY=0
COPY package.json package-lock.json* ./
COPY apps/server/package.json ./apps/server/
RUN npm ci --ignore-scripts --workspace=server 2>/dev/null || npm install --ignore-scripts --workspace=server
COPY apps/server ./apps/server
RUN npm run build -w server

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
ENV HUSKY=0
COPY package.json package-lock.json* ./
COPY apps/server/package.json ./apps/server/
RUN npm ci --omit=dev --ignore-scripts --workspace=server 2>/dev/null || npm install --omit=dev --ignore-scripts --workspace=server
COPY --from=builder /app/apps/server/dist ./apps/server/dist
EXPOSE 3001
CMD ["node", "apps/server/dist/index.js"]
