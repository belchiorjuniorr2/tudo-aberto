import json,re,sys,os,time
import argostranslate.translate as T
tr=T.get_translation_from_codes('en','pt')
C='/workspace/i18n/cache.json'; cache=json.load(open(C)) if os.path.exists(C) else {}
comum=json.load(open('/workspace/tudo-aberto/i18n/comum.json'))
PT=[(r'\bFicheiros\b','Arquivos'),(r'\bficheiros\b','arquivos'),(r'\bFicheiro\b','Arquivo'),(r'\bficheiro\b','arquivo'),(r'\bGravar\b','Salvar'),(r'\bgravar\b','salvar'),(r'\bgravad','salv'),(r'\becrã\b','tela'),(r'\bEcrã\b','Tela'),(r'\butilizador(es)?\b',lambda m:'usuário'+('s' if m.group(1) else '')),(r'\bUtilizador(es)?\b',lambda m:'Usuário'+('s' if m.group(1) else '')),(r'\bregisto','registro'),(r'\bRegisto','Registro'),(r'\bInicie sessão\b','Entre'),(r'\biniciar sessão\b','entrar'),(r'\bTerminar sessão\b','Sair'),(r'\bTransferir\b','Baixar'),(r'\bcontacto','contato'),(r'\bContacto','Contato'),(r'\bactual','atual'),(r'\bActual','Atual'),(r'\bacção\b','ação'),(r'\bAcção\b','Ação'),(r'\bacções\b','ações'),(r'\bselecção\b','seleção'),(r'\bSelecção\b','Seleção'),(r'\bfacto\b','fato'),(r'\bequipa\b','equipe'),(r'\bEquipa\b','Equipe'),(r'\bpartilh','compartilh'),(r'\bPartilh','Compartilh'),(r'\bApagar\b','Excluir'),(r'\bLigação\b','Link'),(r'\bligação\b','link'),(r'\bAlimentado por\b','Feito com'),(r'\bAproveita\b','Aproveite'),(r'\btelemóvel\b','celular'),(r'\bpequeno-almoço\b','café da manhã'),(r'\bdefinições\b','configurações'),(r'\bDefinições\b','Configurações'),(r'\bdescarregar\b','baixar'),(r'\bDescarregar\b','Baixar'),(r'\bcriar\b','criar')]
def ok(src,dst):
    if not dst or dst==src: return False
    if re.search(r'[A-ZÀ-Ú]{3,}',dst) and not re.search(r'[A-Z]{3,}',src): return False
    if len(dst)>len(src)*2.6+8 or len(dst)<len(src)*0.35: return False
    for ph in re.findall(r'\{\w+\}|%[sd]|\$\{?\w+\}?',src):
        if ph not in dst: return False
    if sorted(re.findall(r'\d+',src))!=sorted(re.findall(r'\d+',dst)): return False
    if src.endswith('…') and not dst.endswith('…'): dst+='…'
    return True
def fix(s,d):
    for a,b in PT: d=re.sub(a,b,d)
    d=FX(d)
    if src_cap(s) and d: d=d[0].upper()+d[1:]
    if s.endswith('…') and not d.endswith('…'): d=d.rstrip('.')+'…'
    if s.endswith(':') and not d.endswith(':'): d+=':'
    return d
exec(open('/workspace/fixpt.py').read().split('for f in glob')[0]); FX=fx
src_cap=lambda s: s[:1].isupper()
def cand(s):
    s2=s.strip()
    if len(s2)<2 or len(s2)>160: return False
    if re.fullmatch(r'[A-Z0-9_]+',s2) and len(s2)>3: return False
    if re.fullmatch(r'[a-z][a-zA-Z0-9]*',s2) and s2 not in comum: return False   # identificador
    if re.search(r'[-_.:]\w',s2) and ' ' not in s2: return False
    if not re.search(r'[A-Za-z]{2}',s2): return False
    return True
def translate(strings):
    out={}; todo=[]
    for s in strings:
        k=s.strip()
        if not cand(k): continue
        if k in comum: out[k]=comum[k]; continue
        if k in cache: 
            if cache[k]: out[k]=cache[k]
            continue
        todo.append(k)
    t0=time.time()
    for i,k in enumerate(todo):
        try: d=tr.translate(k)
        except Exception: d=''
        d=fix(k,d)
        cache[k]=d if ok(k,d) else ''
        if cache[k]: out[k]=cache[k]
        if i%500==499: json.dump(cache,open(C,'w'),ensure_ascii=False); print(i+1,'/',len(todo),round(time.time()-t0),'s',flush=True)
    json.dump(cache,open(C,'w'),ensure_ascii=False)
    return out
if __name__=='__main__':
    for app in sys.argv[1:]:
        S=json.load(open(f'/workspace/i18n/{app}.json'))
        d=translate(S)
        os.makedirs('/workspace/tudo-aberto/i18n/apps',exist_ok=True)
        json.dump(dict(sorted(d.items())),open(f'/workspace/tudo-aberto/i18n/apps/{app}.json','w'),ensure_ascii=False,indent=0)
        print(app,len(S),'->',len(d),flush=True)
