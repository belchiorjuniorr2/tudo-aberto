#!/usr/bin/env python3
"""Corrige caminhos absolutos à raiz ("/arquivo") nos builds de site/<app>/ quando o arquivo existe
dentro da pasta do app mas não na raiz do site (os apps foram feitos para rodar na raiz de um domínio)."""
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); SITE = os.path.join(ROOT, 'site')
pat = re.compile(r'''(?<=["'`(])/([A-Za-z0-9_\-][A-Za-z0-9_\-./]*\.[A-Za-z0-9]{2,6})(?=["'`)?#])''')
total = 0
for app in sorted(os.listdir(SITE)):
    d = os.path.join(SITE, app)
    if not os.path.isdir(d) or app.startswith('_') or app == 'apps': continue
    for dp, _, fs in os.walk(d):
        for f in fs:
            if not re.search(r'\.(js|mjs|css|html|webmanifest|json)$', f): continue
            p = os.path.join(dp, f)
            try: s = open(p, encoding='utf-8').read()
            except Exception: continue
            n = 0
            def rep(m):
                global total
                nonlocal_n[0] += 0
                rel = m.group(1)
                if rel.startswith(app + '/'): return m.group(0)
                if os.path.isfile(os.path.join(d, rel)) and not os.path.exists(os.path.join(SITE, rel)):
                    nonlocal_n[0] += 1; return f'/{app}/{rel}'
                return m.group(0)
            nonlocal_n = [0]
            s2 = pat.sub(rep, s)
            if nonlocal_n[0]: open(p, 'w', encoding='utf-8').write(s2); total += nonlocal_n[0]; print(f'{app}: {os.path.relpath(p, d)} ({nonlocal_n[0]})')
print('caminhos corrigidos:', total)
