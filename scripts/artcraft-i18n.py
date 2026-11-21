#!/usr/bin/env python3
"""Gera o dicionário pt-BR embutido no ArtCraft (src/artcraft).

Junta i18n/comum.json (termos comuns revisados) + i18n/apps/artcraft.json (strings do ArtCraft, revisadas à mão)
em src/artcraft/frontend/apps/artcraft/app/src/i18n-ptbr/ptbr-dicionario.json, que o tradutor
ptbr.ts importa no build. Rode na raiz do repositório depois de editar os JSON de i18n/.
"""
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
comum = json.load(open(os.path.join(ROOT, 'i18n', 'comum.json')))
app = json.load(open(os.path.join(ROOT, 'i18n', 'apps', 'artcraft.json')))
d = {**comum, **app}
d = {k: v for k, v in d.items() if k.strip() and v and v != k}
out = os.path.join(ROOT, 'src', 'artcraft', 'frontend', 'apps', 'artcraft', 'app', 'src', 'i18n-ptbr', 'ptbr-dicionario.json')
with open(out, 'w') as f:
    json.dump(dict(sorted(d.items())), f, ensure_ascii=False, indent=0)
    f.write('\n')
print(f'{len(d)} entradas -> {os.path.relpath(out, ROOT)}')
