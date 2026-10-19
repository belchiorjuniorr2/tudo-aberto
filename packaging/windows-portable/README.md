# Tudo Aberto — versão portátil para Windows

Empacota o site estático (`site/`, gerado por `scripts/build-site.sh`) num único `.exe` portátil (Electron), sem instalação.
O app sobe um servidor local em `127.0.0.1:47821` e abre o Tudo Aberto numa janela; login e dados continuam no Supabase.

```sh
cd packaging/windows-portable
npm install
npm run dist   # gera dist/TudoAberto-Portatil-<versão>-x64.exe (em Linux precisa de wine)
```

Licença MIT; créditos ao projeto original HeyPuter/everything (veja LICENSE e NOTICE.md na raiz).
