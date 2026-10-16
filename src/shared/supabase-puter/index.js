// Adaptador Tudo Aberto: substitui puter.auth, puter.fs e puter.kv por Supabase (Auth, Storage, tabela kv).
// Os demais módulos do Puter (ai, workers, peer, hosting, ui, perms, net) continuam vindo do SDK original.
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, BUCKET } from './config.js';

const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
const STORAGE_KEY = `sb-${new URL(SUPABASE_URL).hostname.split('.')[0]}-auth-token`;
const APP = (location.pathname.split('/').filter(Boolean)[0] || 'tudo-aberto');

function cachedSession() {
  try { const s = JSON.parse(localStorage.getItem(STORAGE_KEY)); return s && s.user ? s : null; } catch { return null; }
}
let session = cachedSession();
sb.auth.onAuthStateChange((_e, s) => { session = s; });
sb.auth.getSession().then(({ data }) => { session = data.session; });
const uid = () => session?.user?.id;

function err(code, message) { const e = new Error(message || code); e.code = code; e.message = message || code; return e; }

function toUser(u) {
  if (!u) return null;
  if (u.is_anonymous) return { uuid: u.id, id: u.id, username: 'visitante', email: null, email_confirmed: false, is_temp: true };
  const name = u.user_metadata?.username || (u.email || '').split('@')[0];
  return { uuid: u.id, id: u.id, username: name, email: u.email, email_confirmed: !!u.email_confirmed_at, is_temp: false };
}

// ---------- UI de login (pt-BR) ----------
let pending = null;
function loginDialog() {
  if (pending) return pending;
  pending = new Promise((resolve, reject) => {
    const w = document.createElement('div');
    w.setAttribute('style', 'position:fixed;inset:0;z-index:2147483647;background:rgba(0,0,0,.45);display:flex;align-items:center;justify-content:center;font:14px system-ui,sans-serif');
    w.innerHTML = `<form style="background:#fff;color:#1a1d21;padding:24px;border-radius:12px;width:min(360px,92vw);box-shadow:0 10px 40px #0004;display:flex;flex-direction:column;gap:10px">
      <h2 style="margin:0 0 4px;font-size:18px">Entrar no Tudo Aberto</h2>
      <p style="margin:0;color:#5b6470;font-size:13px">Seus arquivos e dados ficam salvos na sua conta.</p>
      <input name="email" type="email" required placeholder="E-mail" autocomplete="email" style="padding:9px;border:1px solid #ccd;border-radius:8px">
      <input name="senha" type="password" placeholder="Senha (mín. 6 caracteres)" autocomplete="current-password" style="padding:9px;border:1px solid #ccd;border-radius:8px">
      <button name="entrar" style="padding:10px;border:0;border-radius:8px;background:#2563eb;color:#fff;font-weight:600;cursor:pointer">Entrar</button>
      <button name="criar" type="button" style="padding:9px;border:1px solid #2563eb;border-radius:8px;background:#fff;color:#2563eb;cursor:pointer">Criar conta</button>
      <button name="visitante" type="button" style="padding:9px;border:1px dashed #5b6470;border-radius:8px;background:#f6f7f9;color:#1a1d21;cursor:pointer">Entrar como visitante (demo)</button>
      <button name="link" type="button" style="padding:6px;border:0;background:none;color:#2563eb;cursor:pointer;text-decoration:underline">Receber link de acesso por e-mail</button>
      <button name="cancelar" type="button" style="padding:6px;border:0;background:none;color:#5b6470;cursor:pointer">Cancelar</button>
      <p name="msg" style="margin:0;min-height:1em;font-size:13px;color:#b42318"></p></form>`;
    const f = w.firstElementChild, msg = f.querySelector('[name=msg]');
    const say = (t, ok) => { msg.textContent = t; msg.style.color = ok ? '#067647' : '#b42318'; };
    const done = (u) => { w.remove(); pending = null; resolve(u); };
    const email = () => f.email.value.trim(), senha = () => f.senha.value;
    f.addEventListener('submit', async (ev) => {
      ev.preventDefault();
      const { data, error } = await sb.auth.signInWithPassword({ email: email(), password: senha() });
      if (error) return say(error.message === 'Invalid login credentials' ? 'E-mail ou senha incorretos.' : error.message.includes('not confirmed') ? 'Confirme seu e-mail antes de entrar.' : error.message);
      session = data.session; done(toUser(data.user));
    });
    f.criar.onclick = async () => {
      if (!email() || senha().length < 6) return say('Informe e-mail e uma senha com 6+ caracteres.');
      const { data, error } = await sb.auth.signUp({ email: email(), password: senha(), options: { emailRedirectTo: location.href } });
      if (error) return say(error.message);
      if (data.session) { session = data.session; return done(toUser(data.user)); }
      say('Conta criada! Confirme pelo link enviado ao seu e-mail e depois entre.', true);
    };
    f.link.onclick = async () => {
      if (!email()) return say('Informe seu e-mail.');
      const { error } = await sb.auth.signInWithOtp({ email: email(), options: { emailRedirectTo: location.href } });
      say(error ? error.message : 'Link enviado! Abra seu e-mail para entrar.', !error);
    };
    f.visitante.onclick = async () => {
      const { data, error } = await sb.auth.signInAnonymously();
      if (error) return say(error.message);
      session = data.session; demoBadge(); done(toUser(data.user));
    };
    f.cancelar.onclick = () => { w.remove(); pending = null; reject(err('aborted', 'Login cancelado')); };
    (document.body || document.documentElement).appendChild(w);
    f.email.focus();
  });
  return pending;
}

// ---------- modo demo (usuário anônimo) ----------
function demoBadge() {
  if (!session?.user?.is_anonymous || document.getElementById('tudo-aberto-demo')) return;
  const b = document.createElement('div');
  b.id = 'tudo-aberto-demo';
  b.setAttribute('style', 'position:fixed;left:10px;bottom:10px;z-index:2147483646;background:#fff8e6;color:#7a4b00;border:1px solid #f0d08a;border-radius:8px;padding:6px 10px;font:12px system-ui,sans-serif;box-shadow:0 2px 8px #0002;display:flex;gap:8px;align-items:center');
  b.innerHTML = 'Modo demo: dados temporários <button style="border:0;background:none;color:#2563eb;cursor:pointer;text-decoration:underline;font:inherit;padding:0">Criar conta</button><button title="Fechar" style="border:0;background:none;cursor:pointer;color:#7a4b00;font:inherit;padding:0">×</button>';
  const [criar, fechar] = b.querySelectorAll('button');
  fechar.onclick = () => b.remove();
  criar.onclick = async () => {
    const email = prompt('Seu e-mail para guardar os dados desta demo numa conta:');
    if (!email) return;
    // Converte o visitante em conta permanente, mantendo o mesmo user_id (e os dados).
    const r1 = await sb.auth.updateUser({ email }, { emailRedirectTo: location.href });
    if (r1.error) return alert('Não foi possível: ' + r1.error.message);
    alert('Enviamos um link de confirmação para ' + email + '. Ao confirmar, a conta passa a ser sua e os dados desta demo ficam guardados. Para entrar depois, use "Receber link de acesso por e-mail".');
  };
  (document.body || document.documentElement).appendChild(b);
}
sb.auth.onAuthStateChange(() => setTimeout(() => { if (session?.user?.is_anonymous) demoBadge(); else document.getElementById('tudo-aberto-demo')?.remove(); }));
if (typeof document !== 'undefined') document.addEventListener('DOMContentLoaded', () => demoBadge());

const auth = {
  isSignedIn: () => !!session,
  async signIn() { if (session) return toUser(session.user); return loginDialog(); },
  async signOut() { await sb.auth.signOut(); session = null; },
  async getUser() { if (!session) throw err('unauthorized', 'Não autenticado'); const { data } = await sb.auth.getUser(); return toUser(data.user || session.user); },
  async whoami() { return auth.getUser(); },
  async getProfilePicture() { return null; },
};
async function need() { if (!session) await auth.signIn(); return uid(); }

// ---------- fs -> Storage ----------
function rel(p) {
  p = String(p || '').replace(/\\/g, '/');
  if (p.startsWith('~')) p = p.slice(1);
  const name = session?.user && toUser(session.user).username;
  p = p.replace(/^\/+/, '');
  if (name && p.startsWith(name + '/')) p = p.slice(name.length + 1);
  return p.replace(/\/+$/, '');
}
const key = (p) => `${uid()}/${rel(p)}`;
const display = (r) => `~/${r}`;
function entry(r, o = {}) {
  const name = r.split('/').pop();
  return { name, path: display(r), uid: o.id || r, id: o.id || r, is_dir: !!o.dir, size: o.metadata?.size ?? 0,
    modified: o.updated_at ? Date.parse(o.updated_at) / 1000 : 0, created: o.created_at ? Date.parse(o.created_at) / 1000 : 0, type: o.metadata?.mimetype || null };
}
async function listRaw(dirRel) {
  const { data, error } = await sb.storage.from(BUCKET).list(`${uid()}${dirRel ? '/' + dirRel : ''}`, { limit: 1000 });
  if (error) throw err('network', error.message);
  return data || [];
}
async function walkFiles(dirRel) {
  const out = [];
  for (const o of await listRaw(dirRel)) {
    const r = dirRel ? `${dirRel}/${o.name}` : o.name;
    if (o.id === null) out.push(...await walkFiles(r)); else out.push(r);
  }
  return out;
}
const fs = {
  async write(path, data, opts = {}) {
    await need();
    let r = rel(path);
    if (opts.dedupeName && !opts.overwrite) { try { await fs.stat(r); r = r.replace(/(\.[^./]*)?$/, (m) => ` (${Date.now()})${m}`); } catch {} }
    const body = data instanceof Blob ? data : new Blob([typeof data === 'string' || data instanceof ArrayBuffer || ArrayBuffer.isView(data) ? data : JSON.stringify(data)]);
    const { data: d, error } = await sb.storage.from(BUCKET).upload(key(r), await body.arrayBuffer(), { upsert: opts.overwrite !== false, contentType: body.type || 'application/octet-stream' });
    if (error) throw err(/exists/i.test(error.message) ? 'item_with_same_name_exists' : 'network', error.message);
    return entry(r, { id: d?.id, metadata: { size: body.size } });
  },
  async read(path) {
    await need();
    const { data, error } = await sb.storage.from(BUCKET).download(key(path));
    if (error) throw err('subject_does_not_exist', 'Arquivo não encontrado');
    return data;
  },
  async readdir(path) {
    await need();
    const r = rel(typeof path === 'object' ? path.path : path);
    return (await listRaw(r)).filter((o) => o.name !== '.keep').map((o) => entry(r ? `${r}/${o.name}` : o.name, { ...o, dir: o.id === null }));
  },
  async mkdir(path) {
    await need(); const r = rel(path);
    await sb.storage.from(BUCKET).upload(`${uid()}/${r}/.keep`, new Blob(['']), { upsert: true });
    return entry(r, { dir: true });
  },
  async stat(path) {
    await need(); const r = rel(typeof path === 'object' ? path.path : path);
    if (!r) return entry('', { dir: true });
    const parent = r.includes('/') ? r.slice(0, r.lastIndexOf('/')) : '';
    const name = r.split('/').pop();
    const o = (await listRaw(parent)).find((x) => x.name === name);
    if (!o) throw err('subject_does_not_exist', 'Arquivo não encontrado');
    return entry(r, { ...o, dir: o.id === null });
  },
  async delete(paths) {
    await need();
    const list = Array.isArray(paths) ? paths : [paths];
    const keys = [];
    for (const p of list) { const r = rel(p); keys.push(key(r)); for (const f of await walkFiles(r).catch(() => [])) keys.push(`${uid()}/${f}`); }
    const { error } = await sb.storage.from(BUCKET).remove(keys);
    if (error) throw err('network', error.message);
  },
  async move(from, to) {
    await need(); const a = rel(from); let b = rel(to);
    const files = await walkFiles(a).catch(() => []);
    if (files.length) { for (const f of files) await sb.storage.from(BUCKET).move(`${uid()}/${f}`, `${uid()}/${b}${f.slice(a.length)}`); }
    else { const { error } = await sb.storage.from(BUCKET).move(key(a), key(b)); if (error) throw err('subject_does_not_exist', error.message); }
    return entry(b);
  },
  async rename(path, newName) { const a = rel(path); const dir = a.includes('/') ? a.slice(0, a.lastIndexOf('/') + 1) : ''; return fs.move(a, dir + newName); },
  async copy(from, to) { await need(); const { error } = await sb.storage.from(BUCKET).copy(key(from), key(to)); if (error) throw err('network', error.message); return entry(rel(to)); },
  async upload(files, dir = '') { const out = []; for (const f of files) out.push(await fs.write(`${rel(dir)}/${f.name}`, f)); return out; },
  async getReadURL(path, ttl = 86400) { await need(); const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(key(path), Math.max(60, Math.floor(ttl))); if (error) throw err('subject_does_not_exist', error.message); return data.signedUrl; },
  async revokeReadURL() { /* links assinados expiram sozinhos */ },
  async space() { return { capacity: 1024 ** 3, used: 0 }; },
  async share() { throw err('not_supported', 'Compartilhamento entre usuários ainda não disponível no Tudo Aberto'); },
  async unshare() { throw err('not_supported', 'Não disponível'); },
  async listShared() { return []; },
  async getShares() { return []; },
};

// ---------- kv -> tabela public.kv (por app); sem login usa localStorage ----------
const LS = `tudo-aberto.kv.${APP}.`;
const local = {
  get: (k) => { const v = localStorage.getItem(LS + k); return v == null ? null : JSON.parse(v); },
  set: (k, v) => localStorage.setItem(LS + k, JSON.stringify(v)),
  del: (k) => localStorage.removeItem(LS + k),
  keys: () => Object.keys(localStorage).filter((k) => k.startsWith(LS)).map((k) => k.slice(LS.length)),
};
const globToLike = (p) => p.replace(/[%_]/g, '\\$&').replace(/\*/g, '%');
const kv = {
  MAX_KEY_SIZE: 1024, MAX_VALUE_SIZE: 400 * 1024,
  async set(k, v) {
    if (!session) { local.set(k, v); return true; }
    const { error } = await sb.from('kv').upsert({ user_id: uid(), app: APP, key: String(k), value: v, updated_at: new Date().toISOString() });
    if (error) throw err('network', error.message); return true;
  },
  async get(k) {
    if (!session) return local.get(k);
    const { data, error } = await sb.from('kv').select('value').eq('app', APP).eq('key', String(k)).maybeSingle();
    if (error) throw err('network', error.message); return data ? data.value : null;
  },
  async del(k) {
    if (!session) { local.del(k); return true; }
    const { error } = await sb.from('kv').delete().eq('app', APP).eq('key', String(k));
    if (error) throw err('network', error.message); return true;
  },
  async list(pattern, returnValues) {
    if (typeof pattern === 'boolean') { returnValues = pattern; pattern = undefined; }
    if (!session) {
      const re = pattern ? new RegExp('^' + pattern.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$') : null;
      const ks = local.keys().filter((k) => !re || re.test(k));
      return returnValues ? ks.map((k) => ({ key: k, value: local.get(k) })) : ks;
    }
    let q = sb.from('kv').select(returnValues ? 'key,value' : 'key').eq('app', APP);
    if (pattern) q = q.like('key', globToLike(pattern));
    const { data, error } = await q.limit(10000);
    if (error) throw err('network', error.message);
    return returnValues ? data : data.map((r) => r.key);
  },
  async incr(k, by = 1) { const n = (Number(await kv.get(k)) || 0) + (typeof by === 'number' ? by : 1); await kv.set(k, n); return n; },
  async decr(k, by = 1) { return kv.incr(k, -(typeof by === 'number' ? by : 1)); },
  async add(k, obj) { const cur = (await kv.get(k)) || {}; const v = Array.isArray(cur) ? cur.concat(obj) : { ...cur, ...obj }; await kv.set(k, v); return v; },
  async update(k, obj) { return kv.add(k, obj); },
  async remove(k, ...paths) { const cur = (await kv.get(k)) || {}; for (const p of paths.flat()) delete cur[p]; await kv.set(k, cur); return cur; },
  async flush() { if (!session) { local.keys().forEach(local.del); return true; } await sb.from('kv').delete().eq('app', APP); return true; },
  async clear() { return kv.flush(); },
};

function patch(p) {
  if (!p || p.tudoAberto) return p;
  for (const [name, impl] of [['auth', auth], ['fs', fs], ['kv', kv]]) {
    let merged = Object.assign(Object.create(p[name] || null), impl);
    // O SDK pode recriar seus submódulos; mantemos sempre a versão Supabase.
    Object.defineProperty(p, name, { configurable: true, get: () => merged, set: (v) => { merged = Object.assign(Object.create(v || null), impl); } });
  }
  p.isSignedIn = auth.isSignedIn; p.signIn = auth.signIn; p.signOut = auth.signOut; p.getUser = auth.getUser;
  p.supabase = sb; p.tudoAberto = true;
  return p;
}
// Intercepta a atribuição window.puter = new Puter() do SDK oficial e troca auth/fs/kv pelo Supabase.
let current = patch(globalThis.puter);
try {
  Object.defineProperty(globalThis, 'puter', { configurable: true, get: () => current, set: (v) => { current = patch(v); } });
} catch { current = patch(globalThis.puter || {}); }
// Se o SDK do Puter não carregar, os apps ainda têm auth/fs/kv.
window.addEventListener('load', () => setTimeout(() => { if (!current) current = patch({ env: 'web' }); }, 3000));
globalThis.tudoAbertoSupabase = sb;
export { sb, auth, fs, kv };
