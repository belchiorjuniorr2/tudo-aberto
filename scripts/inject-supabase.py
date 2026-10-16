#!/usr/bin/env python3
"""Injeta o adaptador Supabase (src/shared/supabase-puter) em todo HTML de site/ que carrega o SDK do Puter."""
import os, re, shutil, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pkg = os.path.join(ROOT, 'src/shared/supabase-puter')
if not os.path.exists(os.path.join(pkg, 'dist/supabase-puter.js')):
    subprocess.run('npm install --no-audit --no-fund && npm run build', shell=True, cwd=pkg, check=True)
os.makedirs(os.path.join(ROOT, 'site/_shared'), exist_ok=True)
shutil.copy(os.path.join(pkg, 'dist/supabase-puter.js'), os.path.join(ROOT, 'site/_shared/supabase-puter.js'))
shutil.copy(os.path.join(pkg, 'ptbr.js'), os.path.join(ROOT, 'site/_shared/ptbr.js'))
shutil.copy(os.path.join(pkg, 'extras.js'), os.path.join(ROOT, 'site/_shared/extras.js'))
# Dicionários de interface pt-BR (i18n/comum.json + i18n/apps/<app>.json)
os.makedirs(os.path.join(ROOT, 'site/_i18n'), exist_ok=True)
shutil.copy(os.path.join(ROOT, 'i18n/comum.json'), os.path.join(ROOT, 'site/_i18n/comum.json'))
for f in os.listdir(os.path.join(ROOT, 'i18n/apps')) if os.path.isdir(os.path.join(ROOT, 'i18n/apps')) else []:
    shutil.copy(os.path.join(ROOT, 'i18n/apps', f), os.path.join(ROOT, 'site/_i18n', f))
APPS_I18N = {f[:-5] for f in os.listdir(os.path.join(ROOT, 'site/_i18n'))}
PT = '<script src="/_shared/ptbr.js" data-tudo-aberto-ptbr></script>'
EX = '<script src="/_shared/extras.js" defer data-tudo-aberto-extras></script>'
TAG = '<script src="/_shared/supabase-puter.js" data-tudo-aberto></script>'
n = 0
for d, _, fs in os.walk(os.path.join(ROOT, 'site')):
    for f in fs:
        if not f.endswith('.html'): continue
        p = os.path.join(d, f); s = open(p, encoding='utf-8').read()
        app = os.path.relpath(p, os.path.join(ROOT, 'site')).split(os.sep)[0]
        o = s
        if app in APPS_I18N and 'data-tudo-aberto-ptbr' not in s:
            s = re.sub(r'(<head[^>]*>)', r'\1' + PT, s, count=1, flags=re.I)
        rel = os.path.relpath(p, os.path.join(ROOT, 'site'))
        if rel.count(os.sep) == 1 and f == 'index.html' and not app.startswith('_') and app != 'apps' and 'data-tudo-aberto-extras' not in s:
            s = re.sub(r'(<head[^>]*>)', r'\1' + EX, s, count=1, flags=re.I)
        if 'js.puter.com/v2' in s and 'data-tudo-aberto>' not in s and 'data-tudo-aberto ' not in s:
            s = re.sub(r'(<head[^>]*>)', r'\1' + TAG, s, count=1, flags=re.I)
        if s == o: continue
        open(p, 'w', encoding='utf-8').write(s); n += 1
print('html com adaptador:', n)
