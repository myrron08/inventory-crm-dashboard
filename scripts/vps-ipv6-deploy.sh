#!/usr/bin/env bash
# Optional: deploy on IPv6-only VPS (upload tarball first). Prefer scripts/vps-ipv4-deploy-remote.sh + IPv4.
set -euo pipefail

IPV6="${IPV6:?Set your VPS IPv6 address}"
DEPLOY_DIR="${DEPLOY_DIR:-/root/test-jobs}"

if [[ ! -f "${DEPLOY_DIR}/docker-compose.yml" ]]; then
  echo "Upload project to ${DEPLOY_DIR} first (git clone or scp tarball)."
  exit 1
fi

export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl ca-certificates

if ! command -v docker >/dev/null 2>&1; then
  curl -fsSL https://get.docker.com | sh
fi

if ! swapon --show | grep -q swapfile; then
  fallocate -l 2G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=2048
  chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
fi

cd "${DEPLOY_DIR}"

cat >.env <<EOF
NODE_ENV=production
PORT=3001
CLIENT_ORIGIN=http://[${IPV6}]
COMPOSE_CLIENT_PUBLISH=80:80
VITE_API_URL=
VITE_SOCKET_URL=
EOF

docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build -d
echo "Site: http://[${IPV6}]"
