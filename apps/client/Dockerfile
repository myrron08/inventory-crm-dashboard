FROM node:22-alpine AS builder
WORKDIR /app
ENV HUSKY=0
COPY package.json ./
COPY apps/client/package.json ./apps/client/
RUN npm install --ignore-scripts --workspace=client
COPY apps/client ./apps/client
ARG VITE_API_URL=
ARG VITE_SOCKET_URL=
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SOCKET_URL=$VITE_SOCKET_URL
RUN npm run build -w client

FROM nginx:1.27-alpine
COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
