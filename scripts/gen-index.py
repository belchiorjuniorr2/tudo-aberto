#!/usr/bin/env python3
"""Gera site/index.html (pt-BR) a partir das tabelas do README.md."""
import re, os, shutil, html
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s=open(os.path.join(ROOT,'README.md')).read()
LIMITADOS={'meetings':'precisa de servidor de sinalização','teamchat':'chat em tempo real usa conta Puter','email':'precisa de conta Puter'}
secs=re.split(r'^## ',s,flags=re.M)
out=[]
for sec in secs:
    rows=re.findall(r'<tr><td.*?</tr>',sec)
    if not rows: continue
    title=sec.splitlines()[0]; cards=[]
    for r in rows:
        app=re.search(r'href="src/([^/"]+)/?"',r).group(1)
        name=re.search(r'<strong><a[^>]*>([^<]*)</a>',r).group(1)
        desc=re.findall(r'<td width="420" valign="middle">(.*?)</td>',r)[0]
        if not os.path.exists(os.path.join(ROOT,'site',app,'index.html')): continue
        icon=f'{app}-icon.png'; src=os.path.join(ROOT,'src',app,'icon-128.png')
        if os.path.exists(src): os.makedirs(os.path.join(ROOT,'site','_icons'),exist_ok=True); shutil.copy(src,os.path.join(ROOT,'site','_icons',icon))
        lim=f'<span class="lim">⚠ {LIMITADOS[app]}</span>' if app in LIMITADOS else ''
        label='Descrição' if 'Jogos' in title else 'Alternativa a'
        cards.append(f'<a class="card" href="/{app}/"><img src="/_icons/{icon}" alt=""><div><b>{name}</b><small>{label}: {desc}</small>{lim}</div></a>')
    if cards: out.append(f'<h2>{html.escape(title)}</h2><div class="grid">{"".join(cards)}</div>')
import json
st=[x for x in json.load(open(os.path.join(ROOT,'scripts','storytold.json'))) if os.path.exists(os.path.join(ROOT,'site',x[0],'index.html'))]
if st:
    cards=''.join(f'<div class="card"><div><b><a href="/{a}/">{n}</a></b><small>{d}</small><span class="cred">Por <a href="https://github.com/storytold/{a}">storytold/{a}</a> · Apache-2.0/MIT · funciona melhor em Chrome/Edge (WebGPU/WebGL2)</span></div></div>' for a,n,d in st)
    out.append('<h2>Da Storytold</h2><p>Apps de código aberto da <a href="https://github.com/storytold">Storytold</a> (ArtCraft), compilados para o navegador a partir do código original, sem modificações, sob licença dupla Apache-2.0 / MIT (arquivos de licença incluídos em cada app). Interfaces em inglês.</p><div class="grid">'+cards+'</div>')
page=f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tudo Aberto — apps de código aberto no navegador</title><meta name="description" content="Alternativas gratuitas e de código aberto aos softwares do mundo, direto no navegador.">
<style>body{{font-family:system-ui,sans-serif;margin:0;background:#f6f7f9;color:#1a1d21}}header{{padding:48px 24px 16px;text-align:center}}h1{{margin:0;font-size:2.4rem}}main{{max-width:1100px;margin:auto;padding:0 20px 60px}}h2{{margin-top:36px}}.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}}.card{{display:flex;gap:12px;align-items:center;background:#fff;border-radius:12px;padding:12px;text-decoration:none;color:inherit;box-shadow:0 1px 3px #0001}}.card:hover{{box-shadow:0 3px 12px #0002}}.card img{{width:48px;height:48px}}.card b{{display:block}}.card small{{color:#5b6470}}.cred{{display:block;font-size:.75rem;margin-top:4px}}.lim{{display:block;font-size:.75rem;color:#a15c00;margin-top:4px}}footer{{text-align:center;color:#5b6470;font-size:.85rem;padding:24px}}@media(prefers-color-scheme:dark){{body{{background:#101215;color:#e8eaed}}.card{{background:#1b1f24}}.card small{{color:#9aa3ad}}}}</style></head>
<body><header><h1>Tudo Aberto</h1><p>Os softwares do mundo, reconstruídos e abertos (MIT). Escolha um app e use direto no navegador.</p><p style="font-size:.9rem;color:#5b6470">Pode testar sem conta: quando o app pedir login, clique em <b>Entrar como visitante (demo)</b>.</p></header><main>{"".join(out)}</main>
<footer>Fork em português de <a href="https://github.com/HeyPuter/everything">HeyPuter/everything</a> (licença MIT) · <a href="https://github.com/belchiorjuniorr2/tudo-aberto">Código no GitHub</a> · Login e nuvem opcionais via Puter.</footer></body></html>'''
open(os.path.join(ROOT,'site','index.html'),'w').write(page)
print('apps na home:',page.count('class="card"'))
