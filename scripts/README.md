# Publicar o site "Tudo Aberto"

```sh
scripts/build-site.sh            # builda todos os apps (ou: scripts/build-site.sh chess sudoku)
python3 scripts/gen-index.py     # gera site/index.html em pt-BR a partir do README
cd site && vercel deploy --prod  # publica em https://tudo-aberto.vercel.app
```

Cada app fica em `/<app>/`. O app `assets` não builda: o código-fonte (`src/main.js`) não existe no repositório original.

## Apps da Storytold
`scripts/build-storytold.sh <repo...>` (rodar em /workspace/storytold-work com os clones; precisa rustup + alvo wasm32 + trunk). Copie `out/<repo>` e os arquivos LICENSE para `site/<repo>/` e rode `gen-index.py`. A lista fica em `scripts/storytold.json`.

## Login e dados com Supabase (no lugar do Puter)
`src/shared/supabase-puter` é um adaptador que troca `puter.auth`, `puter.fs` e `puter.kv` por Supabase
(Auth e-mail/senha + link mágico, Storage no bucket privado `arquivos/<user_id>/...`, tabela `kv` com RLS).
`scripts/inject-supabase.py` (chamado no fim de `build-site.sh`) injeta o adaptador em todo HTML que carrega o SDK do Puter.
Os outros módulos do Puter (ai, workers, peer, hosting, ui, perms, net) continuam vindo do SDK oficial.
Migração: `supabase/migrations/`. Só a chave pública (publishable/anon) vai no front.
