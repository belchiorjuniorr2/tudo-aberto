# Interface em pt-BR

Os apps não têm sistema de i18n. Por isso a tradução é feita em tempo de execução por `src/shared/supabase-puter/ptbr.js`.
Ele troca só o texto visível do DOM (textos, title, placeholder, aria-label, alt, alert/confirm/prompt) por correspondência
exata em `i18n/comum.json` (revisado à mão) + `i18n/apps/<app>.json` (gerado). Não toca código, chaves, rotas nem conteúdo
editável do usuário (contenteditable, inputs, editores, células de grade).

Gerar o dicionário de um app: `python3 i18n/extract.py <app>` (extrai strings) e `python i18n/translate.py <app>`
(tradução automática offline com Argos Translate en→pt + correções pt-PT→pt-BR e filtros de qualidade). Correções manuais: edite o JSON.
`scripts/inject-supabase.py` injeta o tradutor nos apps que têm dicionário.

**ArtCraft** (`src/artcraft`, app de computador): o dicionário `i18n/apps/artcraft.json` foi revisado à mão e é embutido no app
por `python3 scripts/artcraft-i18n.py` (gera `src/artcraft/frontend/apps/artcraft/app/src/i18n-ptbr/ptbr-dicionario.json`,
lido pelo tradutor `ptbr.ts`, versão em TypeScript do `ptbr.js`).
