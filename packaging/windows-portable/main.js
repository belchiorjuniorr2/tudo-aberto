// Tudo Aberto — versão portátil para Windows.
// Serve os arquivos estáticos do site num servidor local (127.0.0.1) para que
// caminhos absolutos e o login do Supabase funcionem como no site publicado.
const { app, BrowserWindow, shell, Menu } = require('electron');
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = app.isPackaged ? path.join(process.resourcesPath, 'site') : path.join(__dirname, 'app-site');
const PORTS = [47821, 47822, 47823, 47824, 0]; // porta fixa = origem estável (mantém login salvo)
const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.mjs':'text/javascript', '.css':'text/css',
  '.json':'application/json', '.webmanifest':'application/manifest+json', '.svg':'image/svg+xml', '.png':'image/png',
  '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif', '.ico':'image/x-icon',
  '.wasm':'application/wasm', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.otf':'font/otf',
  '.mp3':'audio/mpeg', '.wav':'audio/wav', '.ogg':'audio/ogg', '.mp4':'video/mp4', '.webm':'video/webm', '.txt':'text/plain; charset=utf-8',
  '.xml':'application/xml', '.map':'application/json', '.glb':'model/gltf-binary', '.gltf':'model/gltf+json' };

function resolveFile(urlPath) {
  let p = decodeURIComponent(urlPath.split('?')[0].split('#')[0]);
  let f = path.normalize(path.join(ROOT, p));
  if (!f.startsWith(ROOT)) return null;
  const tries = [f, path.join(f, 'index.html'), f + '.html'];
  for (const t of tries) { try { if (fs.statSync(t).isFile()) return t; } catch {} }
  return null;
}

function startServer() {
  const server = http.createServer((req, res) => {
    const f = resolveFile(req.url);
    if (!f) { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}); return res.end('Não encontrado'); }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(f).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(f).pipe(res);
  });
  return new Promise((resolve, reject) => {
    let i = 0;
    const tryNext = () => {
      server.once('error', () => { if (++i < PORTS.length) tryNext(); else reject(new Error('sem porta')); });
      server.listen(PORTS[i], '127.0.0.1', () => resolve(server.address().port));
    };
    tryNext();
  });
}

if (!app.requestSingleInstanceLock()) app.quit();

app.whenReady().then(async () => {
  Menu.setApplicationMenu(null);
  const port = await startServer();
  const base = `http://127.0.0.1:${port}`;
  const win = new BrowserWindow({
    width: 1366, height: 860, title: 'Tudo Aberto', backgroundColor: '#0b0b0f',
    icon: path.join(__dirname, 'build', 'icon.png'),
    webPreferences: { contextIsolation: true, sandbox: true, spellcheck: true }
  });
  win.on('page-title-updated', (e, t) => { e.preventDefault(); win.setTitle(t && t !== 'Tudo Aberto' ? `${t} — Tudo Aberto` : 'Tudo Aberto'); });
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith(base)) return { action: 'allow' };
    shell.openExternal(url); return { action: 'deny' };
  });
  win.loadURL(base + '/');
  app.on('second-instance', () => { if (win.isMinimized()) win.restore(); win.focus(); });
});
app.commandLine.appendSwitch('lang', 'pt-BR');
app.on('window-all-closed', () => app.quit());
