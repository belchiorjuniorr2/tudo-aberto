// Service worker mínimo do Tudo Aberto: só torna o site instalável (PWA).
// Não intercepta requisições, para não interferir nos apps (WASM, cache do Vercel, Supabase).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
