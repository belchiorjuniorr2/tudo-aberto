#!/usr/bin/env bash
# Builda todos os apps de src/ e consolida em site/<app>/ (uso: scripts/build-site.sh [app...])
set -u
ROOT=$(cd "$(dirname "$0")/.." && pwd)
mkdir -p "$ROOT/site" "$ROOT/site-logs"
APPS=("$@"); [ ${#APPS[@]} -eq 0 ] && APPS=($(cd "$ROOT/src" && ls -d */ | tr -d /))
for app in "${APPS[@]}"; do
  d="$ROOT/src/$app"; log="$ROOT/site-logs/$app.log"
  ( cd "$d" && (npm ci --no-audit --no-fund || npm install --no-audit --no-fund) && npm run build -- --base "/$app/" ) >"$log" 2>&1
  if [ $? -eq 0 ] && [ -f "$d/dist/index.html" ]; then
    rm -rf "$ROOT/site/$app"; cp -r "$d/dist" "$ROOT/site/$app"; echo "OK $app"
  else echo "FALHOU $app (veja site-logs/$app.log)"; fi
done
python3 "$ROOT/scripts/inject-supabase.py"
