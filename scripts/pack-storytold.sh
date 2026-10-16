#!/usr/bin/env bash
# Empacota os 12 apps da Storytold já compilados em site/ para o workflow de deploy (release "storytold-builds").
set -euo pipefail
cd "$(dirname "$0")/.."
apps=$(python3 -c "import json;print(' '.join(x[0] for x in json.load(open('scripts/storytold.json'))))")
tar -czf storytold-site.tar.gz -C site $apps
echo "Criado storytold-site.tar.gz. Publique com: gh release create storytold-builds storytold-site.tar.gz (ou gh release upload --clobber)"
