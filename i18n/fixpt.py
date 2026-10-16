import re,json,glob,sys
R=[(r'([aeiouAEIOU])cç',r'\1ç'),(r'([Ss])eleccion',r'\1elecion'),(r'\b([Aa])ctiv',r'\1tiv'),(r'([a-z])activ',r'\1ativ'),(r'([Oo])bjectiv',r'\1bjetiv'),(r'([Óó])ptim',lambda m:('Ó' if m.group(1)=='Ó' else 'ó')+'tim'),(r'\bFolhas\b','Planilhas'),(r'\bFolha\b','Planilha'),(r'\bfolhas de cálculo\b','planilhas'),(r'\bfolha de cálculo\b','planilha'),(r'\bpivô\b','dinâmica'),(r'\bseleccion','selecion'),(r'\bexcepç','exceç'),(r'\bExcepç','Exceç'),(r'\bdirecç','direç'),(r'\bDirecç','Direç'),(r'\bcorrecç','correç'),(r'\bóptimo','ótimo'),(r'\bconnosco\b','conosco'),(r'\bregist(o|os)\b',lambda m:'registro'+('s' if m.group(1)=='os' else '')),(r'\bfacturação\b','faturamento'),(r'\bfactura','fatura'),(r'\bFactura','Fatura'),(r'\bbraquetes\b','colchetes'),(r'\bestofamento\b','preenchimento'),(r'\bClique\b','Clique'),(r'\bmorada\b','endereço'),(r'\bMorada\b','Endereço'),(r'\bautocarro\b','ônibus'),(r'\bpercentagem\b','porcentagem'),(r'\bPercentagem\b','Porcentagem')]
def fx(s):
    for a,b in R: s=re.sub(a,b,s)
    return s
for f in glob.glob('/workspace/tudo-aberto/i18n/apps/*.json')+['/workspace/i18n/cache.json']:
    d=json.load(open(f)); d={k:fx(v) for k,v in d.items()}; json.dump(d,open(f,'w'),ensure_ascii=False,indent=0 if 'apps' in f else None)
print('ok')
