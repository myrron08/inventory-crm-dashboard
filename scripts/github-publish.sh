#!/usr/bin/env bash
# Publish main branch to a new GitHub repository.
set -euo pipefail

REPO_NAME="${REPO_NAME:-inventory-crm}"
GITHUB_USER="${GITHUB_USER:-}"
VISIBILITY="${VISIBILITY:-public}"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cd "${ROOT}"

if git remote get-url origin >/dev/null 2>&1; then
  echo "Remote origin already set:"
  git remote -v
  echo "Pushing main..."
  git push -u origin main
  exit 0
fi

if command -v gh >/dev/null 2>&1 && gh auth status >/dev/null 2>&1; then
  echo "Creating ${VISIBILITY} repo ${REPO_NAME} via GitHub CLI..."
  gh repo create "${REPO_NAME}" \
    --"${VISIBILITY}" \
    --source=. \
    --remote=origin \
    --push
  echo ""
  echo "Done: $(gh repo view --json url -q .url)"
  exit 0
fi

if [[ -z "${GITHUB_USER}" ]]; then
  cat <<'HELP'
GitHub CLI (gh) not installed or not logged in.

1. Create an empty repo: https://github.com/new
   Name: inventory-crm (or set REPO_NAME=...)
   Do NOT add README, .gitignore, or license.

2. Run:
   GITHUB_USER=your_github_login bash scripts/github-publish.sh

Or install gh and login:
   brew install gh   # macOS
   gh auth login
   bash scripts/github-publish.sh
HELP
  exit 1
fi

REMOTE="https://github.com/${GITHUB_USER}/${REPO_NAME}.git"
echo "Adding origin ${REMOTE}"
git remote add origin "${REMOTE}"
echo "Pushing main (you may be asked for GitHub credentials)..."
git push -u origin main
echo ""
echo "Done: ${REMOTE}"
