#!/usr/bin/env python3
"""Injeta o adaptador Supabase (src/shared/supabase-puter) em todo HTML de site/ que carrega o SDK do Puter."""
import os, re, shutil, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
pkg = os.path.join(ROOT, 'src/shared/supabase-puter')
if not os.path.exists(os.path.join(pkg, 'dist/supabase-puter.js')):
    subprocess.run('npm install --no-audit --no-fund && npm run build', shell=True, cwd=pkg, check=True)
os.makedirs(os.path.join(ROOT, 'site/_shared'), exist_ok=True)
shutil.copy(os.path.join(pkg, 'dist/supabase-puter.js'), os.path.join(ROOT, 'site/_shared/supabase-puter.js'))
TAG = '<script src="/_shared/supabase-puter.js" data-tudo-aberto></script>'
n = 0
for d, _, fs in os.walk(os.path.join(ROOT, 'site')):
    for f in fs:
        if not f.endswith('.html'): continue
        p = os.path.join(d, f); s = open(p, encoding='utf-8').read()
        if 'js.puter.com/v2' not in s or 'data-tudo-aberto' in s: continue
        s = re.sub(r'(<head[^>]*>)', r'\1' + TAG, s, count=1, flags=re.I)
        open(p, 'w', encoding='utf-8').write(s); n += 1
print('html com adaptador:', n)
