# Aviso (NOTICE)

**Tudo Aberto** é um fork, traduzido para português do Brasil, de:

- Projeto original: [HeyPuter/everything](https://github.com/HeyPuter/everything)
- Licença: MIT — o texto e o aviso de copyright originais estão preservados sem alterações em [LICENSE](LICENSE).

O histórico git completo do projeto original foi preservado. Alterações deste fork:

- tradução do README e das interfaces para pt-BR (dicionários em `i18n/`, aplicados em tempo de execução);
- login, dados (`kv`) e arquivos via Supabase (`src/shared/supabase-puter`, `supabase/migrations`) no lugar da conta Puter;
- página de login, home de apps (`scripts/`), botão de volta, exportação de dados, PWA e configurações de publicação.

Identificadores de código, chaves, rotas e APIs dos apps não foram alterados. Recursos que dependem da
infraestrutura do Puter (IA, multiplayer online, chamadas de vídeo, publicação de páginas) aparecem como
"indisponível por enquanto". O SDK público do Puter (`js.puter.com`) ainda é carregado pelos apps.

## Apps da Storytold

A seção "Da Storytold" publica, compilados para WebAssembly a partir do código-fonte original e sem
modificações de código, 12 apps de [github.com/storytold](https://github.com/storytold) (CADCraft, DeckCraft,
DesignCraft, EffectCraft, FigCraft, FilmCraft, GridCraft, LightCraft, PhotoCraft, SoundCraft, VectorCraft,
WordCraft), sob licença dupla Apache-2.0 / MIT. Os arquivos de licença (e NOTICE, quando existe) de cada
projeto são distribuídos junto com o app publicado (`/<app>/LICENSE-*`). Os nomes em português nos cards
são apenas descritivos; os nomes originais aparecem entre parênteses.

## Marcas

"Puter" e "HeyPuter" são nomes do projeto original; "Storytold", "ArtCraft" e os nomes "*Craft" pertencem
aos seus respectivos titulares. Os nomes de produtos citados como referência ("alternativa a": Microsoft
Excel, Photoshop, AutoCAD, Figma etc.) são marcas de seus respectivos donos e aparecem apenas para
descrever a função de cada app. Este fork não é afiliado nem endossado por nenhum deles.
