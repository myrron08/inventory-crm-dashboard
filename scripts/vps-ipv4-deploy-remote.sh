#!/usr/bin/env bash
set -euo pipefail
# Run on VPS as root after uploading project to /root/test-jobs
IPV4="${IPV4:?Set IPV4, e.g. IPV4=203.0.113.10 bash vps-ipv4-deploy-remote.sh}"
DEPLOY_DIR="/root/test-jobs"

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl ca-certificates

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

if ! swapon --show | grep -q swapfile; then
  fallocate -l 2G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  grep -q '/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >>/etc/fstab
fi

cd "${DEPLOY_DIR}"

cat >.env <<EOF
NODE_ENV=production
PORT=3001
CLIENT_ORIGIN=http://${IPV4}
COMPOSE_CLIENT_PUBLISH=80:80
VITE_API_URL=
VITE_SOCKET_URL=
EOF

docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d

echo "Site: http://${IPV4}"
curl -sS -o /dev/null -w "HTTP %{http_code}\n" http://127.0.0.1/ || true
