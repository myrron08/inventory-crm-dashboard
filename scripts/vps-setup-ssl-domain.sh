#!/usr/bin/env bash
# Run on VPS as root. Domain A record must point to this server (port 80/443 open).
set -euo pipefail

DOMAIN="${DOMAIN:-tt.tex-home.cc}"
EMAIL="${CERTBOT_EMAIL:-admin@tex-home.cc}"
DEPLOY_DIR="${DEPLOY_DIR:-/root/test-jobs}"
COMPOSE="docker compose -f docker-compose.yml -f docker-compose.prod.yml"

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx

mkdir -p /var/www/certbot

cd "${DEPLOY_DIR}"

cat >.env <<EOF
NODE_ENV=production
PORT=3001
CLIENT_ORIGIN=https://${DOMAIN}
COMPOSE_CLIENT_PUBLISH=127.0.0.1:8080:80
VITE_API_URL=
VITE_SOCKET_URL=
EOF

# Stop host nginx if it conflicts with docker on :80
systemctl stop nginx 2>/dev/null || true
${COMPOSE} up -d --force-recreate

# Temporary HTTP-only vhost for ACME + proxy
cat >/etc/nginx/sites-available/"${DOMAIN}" <<NGINX
server {
  listen 80;
  listen [::]:80;
  server_name ${DOMAIN};
  location /.well-known/acme-challenge/ { root /var/www/certbot; }
  location / {
    proxy_pass http://127.0.0.1:8080;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
    proxy_set_header Upgrade \$http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
NGINX

ln -sf /etc/nginx/sites-available/"${DOMAIN}" /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl enable nginx
systemctl restart nginx

certbot certonly --webroot -w /var/www/certbot -d "${DOMAIN}" \
  --non-interactive --agree-tos -m "${EMAIL}" --no-eff-email

install -D -m 644 "${DEPLOY_DIR}/deploy/nginx/${DOMAIN}.conf" \
  "/etc/nginx/sites-available/${DOMAIN}"
ln -sf "/etc/nginx/sites-available/${DOMAIN}" /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

${COMPOSE} up -d --force-recreate server

echo ""
echo "HTTPS: https://${DOMAIN}"
curl -sS -o /dev/null -w "Local HTTP via docker: %{http_code}\n" http://127.0.0.1:8080/ || true
