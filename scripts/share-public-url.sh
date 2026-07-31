#!/usr/bin/env bash
# Public HTTPS link via localtunnel (no GitHub). Keep terminal open while sharing.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
LT_LOG="/tmp/inventory-crm-lt.log"

pkill -f "localtunnel --port 5173" 2>/dev/null || true
pkill -f "concurrently -n client,server" 2>/dev/null || true
sleep 1

echo "Starting tunnel..."
: >"$LT_LOG"
npx --yes localtunnel --port 5173 2>&1 | tee "$LT_LOG" &
LT_PID=$!

PUBLIC_URL=""
for _ in $(seq 1 60); do
  PUBLIC_URL=$(grep -oE 'https://[a-z0-9-]+\.loca\.lt' "$LT_LOG" 2>/dev/null | head -1 || true)
  [[ -n "$PUBLIC_URL" ]] && break
  sleep 1
done

if [[ -z "$PUBLIC_URL" ]]; then
  echo "Tunnel failed. Log:"
  cat "$LT_LOG"
  kill "$LT_PID" 2>/dev/null || true
  exit 1
fi

echo "Starting dev (CLIENT_ORIGIN=$PUBLIC_URL)..."
export CLIENT_ORIGIN="$PUBLIC_URL"
npm run dev &
DEV_PID=$!

for _ in $(seq 1 90); do
  curl -sS -o /dev/null --max-time 2 http://127.0.0.1:5173/ && break
  sleep 1
done

echo ""
echo "=============================================="
echo "  Share this link:"
echo "  $PUBLIC_URL"
echo ""
echo "  First visit may ask for tunnel password."
echo "  Open https://loca.lt/mytunnelpassword on this Wi‑Fi,"
echo "  enter that IP once, then the app loads for everyone."
echo "=============================================="
echo "Keep this terminal open. Ctrl+C to stop."

cleanup() {
  kill "$DEV_PID" 2>/dev/null || true
  kill "$LT_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

wait "$DEV_PID"
