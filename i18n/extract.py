import re,sys,subprocess,json,collections
app=sys.argv[1]
files=subprocess.run(['git','ls-files',f'src/{app}'],capture_output=True,text=True).stdout.split()
files=[f for f in files if re.search(r'\.(js|ts|jsx|tsx|html|vue|svelte)$',f) and not re.search(r'(test|spec|vendor|tests/|\.d\.ts|worker/|tmp/|scripts/|docs/|mock)',f)]
S=collections.Counter()
lit=re.compile(r"""(?<![\w$])(['"`])((?:(?!\1)[^\\\n]|\\.){2,120}?)\1""")
txt=re.compile(r'>([^<>{}]*[A-Za-z][^<>{}]*)<')
for f in files:
    s=open(f,errors='ignore').read()
    for m in lit.finditer(s):
        t=m.group(2)
        if '${' in t and m.group(1)=='`': continue
        if not re.match(r"^[A-Z][a-z]",t) and not re.search(r'[a-z]+ [a-z]+',t): continue
        if re.search(r'[<>{}=;()\[\]/\\_#@]|^[a-z]+[A-Z]|\.(js|css|png|svg|json)$|https?:',t): continue
        if not re.search(r'[A-Za-z]{2}',t): continue
        S[t]+=1
    for m in txt.finditer(s):
        t=m.group(1).strip()
        if len(t)>1 and re.search(r'[A-Za-z]{2}',t) and not re.search(r'[=;$]',t): S[t]+=1
print(len(S))
json.dump(sorted(S),open(f'/workspace/i18n/{app}.json','w'),ensure_ascii=False,indent=0)
