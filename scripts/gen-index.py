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
    os.makedirs(os.path.join(ROOT,'site','_icons'),exist_ok=True)
    cards=''
    for a,n,orig,d in st:
        ic=os.path.join(ROOT,'scripts','storytold-icons',f'{a}-icon.png')
        if os.path.exists(ic): shutil.copy(ic,os.path.join(ROOT,'site','_icons',f'{a}-icon.png')); img=f'<img src="/_icons/{a}-icon.png" alt="">'
        else: img=f'<svg width="48" height="48" viewBox="0 0 48 48"><rect width="48" height="48" rx="10" fill="#4f46e5"/><text x="24" y="31" font-size="22" text-anchor="middle" fill="#fff" font-family="system-ui">{n[0]}</text></svg>'
        cards+=f'<a class="card gpu" href="/{a}/">{img}<div><b>{n} <sub class="orig">({orig})</sub></b><small>{d}</small><span class="gpu-tag">Requer WebGPU</span></div></a>'
    out.append('<h2>Da Storytold</h2><p class="sec-note">Apps de código aberto da <a href="https://github.com/storytold">Storytold</a> (ArtCraft), compilados para o navegador a partir do código original, sob licença Apache-2.0 / MIT (licenças incluídas em cada app). Interfaces em inglês. Funcionam melhor no Chrome ou Edge atualizado no computador.</p><div class="grid">'+cards+'</div>')
page=f'''<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Tudo Aberto — apps de código aberto no navegador</title><meta name="description" content="Alternativas gratuitas e de código aberto aos softwares do mundo, direto no navegador.">
<script>(function(){{var t;try{{t=localStorage.getItem('tudo-aberto.tema')}}catch(e){{}}if(t!=='light'&&t!=='dark')t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t}})();</script><style>body{{font-family:system-ui,sans-serif;margin:0;background:#f6f7f9;color:#1a1d21}}header{{position:relative;padding:48px 24px 16px;text-align:center}}h1{{margin:0;font-size:2.4rem}}main{{max-width:1100px;margin:auto;padding:0 20px 60px}}h2{{margin-top:36px}}.grid{{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:12px}}.card{{display:flex;gap:12px;align-items:center;background:#fff;border-radius:12px;padding:12px;text-decoration:none;color:inherit;box-shadow:0 1px 3px #0001}}.card:hover{{box-shadow:0 3px 12px #0002}}.card img{{width:48px;height:48px}}.card b{{display:block}}.card small{{color:#5b6470}}.cred{{display:block;font-size:.75rem;margin-top:4px}}.orig{{font-weight:400;color:#8a929c;font-size:.75rem}}.gpu-tag{{display:inline-block;margin-top:4px;font-size:.7rem;padding:1px 6px;border-radius:6px;background:#eef2ff;color:#3730a3}}.sec-note{{color:#5b6470;font-size:.9rem}}.lim{{display:block;font-size:.75rem;color:#a15c00;margin-top:4px}}footer{{text-align:center;color:#5b6470;font-size:.85rem;padding:24px}}a{{color:#2554c7}}.topbtn{{margin-left:8px;padding:6px 12px;border-radius:8px;border:1px solid #c9ced6;background:#fff;color:#1a1d21;cursor:pointer;font:inherit}}.sub2{{font-size:.9rem;color:#5b6470}}[data-theme=dark] body{{background:#101215;color:#e8eaed}}[data-theme=dark] .card{{background:#1b1f24;box-shadow:0 1px 3px #0006}}[data-theme=dark] .card small,[data-theme=dark] .sec-note,[data-theme=dark] footer,[data-theme=dark] .sub2{{color:#a9b1bb}}[data-theme=dark] .orig{{color:#8f98a3}}[data-theme=dark] .gpu-tag{{background:#2b2f5e;color:#d6dbff}}[data-theme=dark] .lim{{color:#ffb35c}}[data-theme=dark] a:not(.card){{color:#8ab4ff}}[data-theme=dark] .topbtn{{background:#1b1f24;color:#e8eaed;border-color:#3a414b}}#ferr{{position:sticky;top:0;z-index:5;padding:12px 0;background:inherit}}#busca{{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:10px;border:1px solid #c9ced6;font:inherit;font-size:1rem;background:#fff;color:inherit}}#chips{{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}}.chip{{padding:5px 11px;border-radius:999px;border:1px solid #c9ced6;background:#fff;color:inherit;cursor:pointer;font:inherit;font-size:.85rem}}.chip.on{{background:#2554c7;border-color:#2554c7;color:#fff}}.card{{position:relative}}.fav{{position:absolute;top:6px;right:6px;border:0;background:none;cursor:pointer;font-size:1.1rem;color:#b8bec7;padding:2px 4px}}.fav::before{{content:'☆'}}.favorito .fav{{color:#e0a100}}.favorito .fav::before{{content:'★'}}[data-theme=dark] #busca,[data-theme=dark] .chip:not(.on){{background:#1b1f24;border-color:#3a414b}}[data-theme=dark] #ferr{{background:#101215}}#ferr{{background:#f6f7f9}}</style></head>
<body><header><div style="position:absolute;top:14px;right:16px;font-size:.85rem"><span id="quem"></span> <button id="tema" class="topbtn" title="Alternar tema claro/escuro" aria-label="Alternar tema claro/escuro"></button><button id="sair" class="topbtn">Sair</button></div><h1>Tudo Aberto</h1><p>Os softwares do mundo, reconstruídos e abertos (MIT). Escolha um app e use direto no navegador.</p><p class="sub2">Pode testar sem conta: quando o app pedir login, clique em <b>Entrar como visitante (demo)</b>.</p></header><main>{"".join(out)}</main><script src="/apps/home.js"></script><script>(function(){{var b=document.getElementById('tema'),h=document.documentElement;function r(){{var d=h.dataset.theme==='dark';b.textContent=d?'☀️':'🌙';b.title=d?'Usar tema claro':'Usar tema escuro'}}r();b.onclick=function(){{h.dataset.theme=h.dataset.theme==='dark'?'light':'dark';try{{localStorage.setItem('tudo-aberto.tema',h.dataset.theme)}}catch(e){{}}r()}}}})();</script><script src="/_shared/supabase-puter.js"></script><script>(function(){{var sb=window.tudoAbertoSupabase;sb.auth.getSession().then(function(r){{var s=r.data.session;if(!s){{location.replace('/');return;}}document.getElementById('quem').textContent=s.user.is_anonymous?'Visitante (demo)':(s.user.email||'');}});document.getElementById('sair').onclick=function(){{sb.auth.signOut().then(function(){{location.replace('/');}});}};}})();</script><script>document.addEventListener('click',function(e){{var a=e.target.closest('a.gpu');if(a&&!navigator.gpu){{if(!confirm('Seu navegador não suporta WebGPU; use Chrome ou Edge atualizado no computador.\\n\\nAbrir mesmo assim?'))e.preventDefault();}}}});</script>
<footer>Fork em português de <a href="https://github.com/HeyPuter/everything">HeyPuter/everything</a> (licença MIT) · <a href="https://github.com/belchiorjuniorr2/tudo-aberto">Código no GitHub</a> · Contas e dados salvos via Supabase.<br><span style="opacity:.75;font-size:.8rem">Interface desenvolvida por José Belchior</span></footer></body></html>'''
os.makedirs(os.path.join(ROOT,'site','apps'),exist_ok=True)
open(os.path.join(ROOT,'site','apps','index.html'),'w').write(page)
os.makedirs(os.path.join(ROOT,'site','_shared'),exist_ok=True)
for f in ('login-bg.webp','login-bg.jpg'): shutil.copy(os.path.join(ROOT,'scripts',f),os.path.join(ROOT,'site','_shared',f))
shutil.copy(os.path.join(ROOT,'scripts','apps-home.js'),os.path.join(ROOT,'site','apps','home.js'))
shutil.copy(os.path.join(ROOT,'scripts','login.html'),os.path.join(ROOT,'site','index.html'))
print('apps na home:',page.count('class="card"'))
