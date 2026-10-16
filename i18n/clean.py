#!/usr/bin/env python3
"""Limpa os dicionários: remove chaves que já estão em português (retraduzidas virando lixo) e traduções com
palavras estranhas que o tradutor automático inventou (ex.: "analogy", "Planet")."""
import json, glob, re, sys
LIXO = re.compile(r'\b(analogy|Planet|impact|securitye|kgm|Seminary|trenó|specification|uvas|elétrica|justificação|caixas)\b')
NAO = {'ArrowUp','ArrowDown','ArrowLeft','ArrowRight','ContextMenu','AbortError','noopener noreferrer','light dark','Meta','Alt','Backspace','PageUp','PageDown','Promise'}
PT = re.compile(r'[ãõçáéíóúâêôà]|\b(de|do|da|para|com|não|você|Jogue|Grátis|seu|sua|Vendas)\b', re.I)
EN = re.compile(r'\b(the|and|of|to|your|with|for|is|delete|add|new|no)\b', re.I)
CORR = json.load(open('i18n/correcoes.json'))
tot = 0
for f in sorted(glob.glob('i18n/apps/*.json')) + ['i18n/comum.json']:
    d = json.load(open(f)); out = {}
    for k, v in d.items():
        if k in NAO: continue
        if k in CORR: out[k] = CORR[k]; continue
        if LIXO.search(v) and not LIXO.search(k): continue
        if k != v and PT.search(k) and not EN.search(k): continue
        out[k] = v
    if out != d:
        tot += len(d) - len(out); json.dump(out, open(f, 'w'), ensure_ascii=False, indent=0, sort_keys=False); open(f,'a').write('\n')
print('removidas:', tot)
