// Teste de fumaça: abre cada app do site e falha se houver 404/5xx em recursos do próprio site ou erro de página.
// Uso: node smoke.mjs [URL] [app...]   (CHROME=/caminho/do/chrome)
import puppeteer from 'puppeteer-core';
const U = process.argv[2] || 'https://tudo-aberto.vercel.app';
let apps = process.argv.slice(3);
const b = await puppeteer.launch({ executablePath: process.env.CHROME || '/opt/google/chrome/chrome', headless: 'new', args: ['--no-sandbox'] });
const p0 = await b.newPage(); await p0.goto(U + '/', { waitUntil: 'networkidle2' }); await p0.evaluate(() => window.tudoAbertoSupabase && window.tudoAbertoSupabase.auth.signInAnonymously()); await p0.close();
if (!apps.length) { const p = await b.newPage(); await p.goto(U + '/apps/', { waitUntil: 'networkidle2' }); apps = [...new Set(await p.$$eval('a.card[href^="/"]', (as) => as.map((a) => a.getAttribute('href').split('/')[1])))]; await p.close(); }
// Sondagens opcionais conhecidas (o app trata a ausência): configuração de organização e fonte CJK sob demanda.
const OPCIONAIS = [/\/organization\.json$/, /_zh_hans\.otf$/];
let falhas = 0;
for (const a of apps) {
  const p = await b.newPage(); const bad = []; const errs = [];
  p.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(U) && !OPCIONAIS.some((x) => x.test(r.url()))) bad.push(`${r.status()} ${r.url().slice(U.length)}`); });
  p.on('pageerror', (e) => errs.push(String(e.message).slice(0, 120)));
  await p.goto(`${U}/${a}/`, { waitUntil: 'networkidle2', timeout: 60000 }).catch((e) => errs.push('NAV ' + e.message));
  await new Promise((r) => setTimeout(r, 2500));
  const ok = !bad.length && !errs.length; if (!ok) falhas++;
  console.log(`${ok ? 'OK   ' : 'FALHA'} ${a}${bad.length ? ' | ' + [...new Set(bad)].join(', ') : ''}${errs.length ? ' | erro: ' + errs.slice(0, 2).join(' / ') : ''}`);
  await p.close();
}
await b.close();
console.log(`${apps.length - falhas}/${apps.length} apps sem erro`); process.exit(falhas ? 1 : 0);
