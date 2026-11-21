<h1 align="center">ArtCraft (em português)</h1>

<p align="center"><strong>A IDE para artistas.</strong> Crie imagens e vídeos com IA usando ferramentas visuais em 2D e 3D.</p>

> **Aviso:** esta pasta é uma cópia do projeto de código aberto [storytold/artcraft](https://github.com/storytold/artcraft)
> (versão `de571bb2`, de 20/11/2026), com a interface traduzida para português do Brasil pelo Tudo Aberto.
> Todo o crédito pelo código é da equipe do ArtCraft e de seus colaboradores. O código é distribuído sob licença dupla
> [MIT](LICENSE-MIT) **ou** [Apache-2.0](LICENSE-APACHE), à sua escolha; os avisos obrigatórios, inclusive de material de
> terceiros, estão em [NOTICE](NOTICE) (mantido sem alterações). O nome, a marca e os logotipos "ArtCraft" pertencem à
> equipe do ArtCraft e **não** são cobertos pela licença. Este fork não é afiliado nem endossado por ela.
> O README original, em inglês, está em [README.en.md](README.en.md).

Vídeo de demonstração (2 minutos, em inglês): <https://www.youtube.com/watch?v=kzvQMdg66Go>

## O que é

O ArtCraft é um aplicativo **de computador** (Windows, macOS e Linux) para criar imagens e vídeos com IA de forma
interativa. Em vez de só escrever um prompt, você monta a cena: compõe em 2D, posiciona objetos e personagens em 3D,
escolhe a câmera e só então gera. Assim o resultado fica mais preciso e repetível.

### Recursos avançados

| Recurso | O que faz |
| --- | --- |
| **Imagem para Cenário** | Coloca atores virtuais num ambiente consistente e planeja várias tomadas no mesmo lugar. |
| **Composição 3D de imagens** | Empilha fundos, primeiros planos e objetos em 3D para criar composições com profundidade. |
| **Composição 2D de imagens** | Monta a cena com camadas de imagem, remoção de fundo e ferramentas de desenho. |
| **Imagem para Malha 3D** | Transforma uma imagem num objeto 3D que você posiciona, gira e enquadra. |
| **Pose de personagens** | Posiciona personagens e a câmera antes de gerar a imagem final. |
| **Blocagem de cena com kitbashing** | Combina kits de objetos 3D para controlar ângulos de câmera, posição e profundidade. |
| **Transferência de identidade** | Usa um manequim posado para guiar a pose e a posição do seu personagem. |
| **Remoção de fundo** | Isola pessoas e objetos para usar como adereços, camadas ou fundos em cenas 2D e 3D. |
| **Criação com recursos mistos** | Junta recortes de imagem, mundos e malhas 3D numa mesma cena. |

### Prompts rápidos

| Recurso | O que faz |
| --- | --- |
| **Texto para Imagem** | Explora ideias com vários modelos de imagem a partir de um texto. |
| **Edição de imagem por prompt** | Descreve as mudanças na imagem, com modelos como Nano Banana Pro e GPT Image. |
| **Edição de imagem no canvas** | Usa desenho, máscaras e inpainting para dizer exatamente onde a imagem muda. |
| **Imagem para Vídeo** | Anima uma imagem com o modelo de vídeo e os controles de geração que você escolher. |

## Modelos e provedores

| Provedor | Modelos e fluxos |
| --- | --- |
| **ArtCraft** | Imagens, vídeo, música e efeitos sonoros, malhas 3D e mundos (catálogo de 62 modelos: Nano Banana, GPT Image, FLUX, Seedream, Seedance, Kling, Veo, Sora, Vidu, MiniMax, Suno, Hunyuan 3D, Tripo3D, Meshy, Rodin, Marble e outros). |
| Grok | Grok Imagine e Grok Video. |
| Midjourney | Geração de imagens do Midjourney. |
| Sora | Sora 1, Sora 2 e GPT Image 1. |
| World Labs | Geração de mundos Marble com Gaussian splats. |

A lista completa de modelos está no [README original](README.en.md#models-and-providers-supported-within-artcraft).

## Importante antes de usar

- **É um app de computador, não um site.** Ele usa [Tauri](https://tauri.app/) (Rust + interface web). Por isso **não**
  aparece no site do Tudo Aberto (`/apps`) nem na versão portátil para Windows do Tudo Aberto.
- **A geração por IA acontece na nuvem.** Para gerar imagens, vídeos, sons ou 3D é preciso entrar com uma conta do
  ArtCraft (que usa créditos/planos pagos do serviço deles) ou conectar sua conta de um provedor suportado
  (Grok, Midjourney, Sora, World Labs). As ferramentas de composição funcionam no seu computador.
- A tradução vale para a interface do app. Prompts, nomes de modelos, nomes de marcas, mensagens que vêm dos servidores
  do ArtCraft e a documentação técnica para desenvolvedores continuam em inglês.

## Como a tradução foi feita

O ArtCraft não tem sistema de idiomas. A tradução segue o mesmo método dos outros apps do Tudo Aberto: um tradutor
de interface ([`frontend/apps/artcraft/app/src/i18n-ptbr/ptbr.ts`](frontend/apps/artcraft/app/src/i18n-ptbr/ptbr.ts)) é
carregado primeiro e troca só o texto **visível** (botões, menus, dicas, avisos) por correspondência exata num dicionário.
Ele não altera código, rotas, prompts nem o que você digita.

- Dicionário-fonte: [`i18n/apps/artcraft.json`](../../i18n/apps/artcraft.json) na raiz do Tudo Aberto (mais os termos comuns de
  [`i18n/comum.json`](../../i18n/comum.json)). Correções: edite esse JSON e rode `python3 scripts/artcraft-i18n.py` na
  raiz do repositório para atualizar o dicionário embutido no app.
- Os títulos das janelas nativas de login (Grok, Midjourney, Sora, World Labs), de cobrança e de atualização também
  foram traduzidos no código Rust.
- Para ver a interface original em inglês: no console do app, rode
  `localStorage.setItem("tudoAberto:idioma", "en")` e recarregue.

## Compilar a partir do código

Pré-requisitos: [Rust](https://doc.rust-lang.org/cargo/getting-started/installation.html), Node.js 20 ou mais recente
(funciona com a v24) e o [Tauri CLI](https://v2.tauri.app/reference/cli/) 2.x. No Linux, instale também as
[dependências do Tauri](https://v2.tauri.app/start/prerequisites/) (WebKitGTK etc.).

```sh
git clone https://github.com/belchiorjuniorr2/tudo-aberto.git
cd tudo-aberto/src/artcraft

# Mac e Linux: interface + app de computador juntos, com recarga automática
./script/artcraft/unix_dev.sh

# Só a interface (sem o app de computador), para conferir a tradução e o build
cd frontend && npm ci && cd apps/artcraft && npx vite build
```

No Windows e para gerar instaladores, veja os scripts em [`script/artcraft`](script/artcraft) e
[`packaging/`](packaging) e o guia original [`_docs/dev_setup.md`](_docs/dev_setup.md) (em inglês).

## Baixar a versão oficial (em inglês)

- Site oficial: <https://getartcraft.com/>
- Versões no GitHub: <https://github.com/storytold/artcraft/releases> (inclui AppImage, DEB, RPM, Arch e Flatpak)

## Licença

O ArtCraft tem licença dupla [MIT](LICENSE-MIT) ou [Apache-2.0](LICENSE-APACHE), à sua escolha.
Copyright (c) 2026 ArtCraft Team e colaboradores do ArtCraft. Os avisos obrigatórios, inclusive de material de terceiros
que não está coberto por essa licença, estão em [NOTICE](NOTICE). As alterações do Tudo Aberto nesta pasta (tradução
da interface, este README e o arquivo `TUDO-ABERTO.md`) seguem a mesma licença dupla.
