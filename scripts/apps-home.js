/* /apps: busca, filtro por categoria, favoritos e recentes (tudo no localStorage). */
(function () {
  var main = document.querySelector('main'); if (!main) return;
  var LF = 'tudo-aberto.favoritos', LR = 'tudo-aberto.recentes';
  function ler(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } }
  function gravar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  var cards = [].slice.call(main.querySelectorAll('.grid a.card'));
  var cats = [];
  cards.forEach(function (c) {
    var g = c.parentElement, h = g.previousElementSibling; while (h && h.tagName !== 'H2') h = h.previousElementSibling;
    c.dataset.cat = h ? h.textContent : ''; if (cats.indexOf(c.dataset.cat) < 0) cats.push(c.dataset.cat);
    c.dataset.app = c.getAttribute('href').split('/')[1];
    c.dataset.busca = c.textContent.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    var s = document.createElement('button'); s.className = 'fav'; s.type = 'button'; s.setAttribute('aria-label', 'Favoritar');
    s.onclick = function (e) { e.preventDefault(); e.stopPropagation(); var f = ler(LF), i = f.indexOf(c.dataset.app); if (i < 0) f.push(c.dataset.app); else f.splice(i, 1); gravar(LF, f); montar(); };
    c.appendChild(s);
    c.addEventListener('click', function () { var r = ler(LR).filter(function (x) { return x !== c.dataset.app; }); r.unshift(c.dataset.app); gravar(LR, r.slice(0, 8)); });
  });
  var bar = document.createElement('div'); bar.id = 'ferr';
  bar.innerHTML = '<input id="busca" type="search" placeholder="Buscar apps (ex.: planilha, Photoshop, PDF)…" aria-label="Buscar apps"><div id="chips"></div>';
  main.insertBefore(bar, main.firstChild);
  var extra = document.createElement('div'); extra.id = 'pessoais'; main.insertBefore(extra, bar.nextSibling);
  var chips = bar.querySelector('#chips'), cat = '';
  ['Todos'].concat(cats).forEach(function (n) {
    var b = document.createElement('button'); b.type = 'button'; b.textContent = n; b.className = 'chip' + (n === 'Todos' ? ' on' : '');
    b.onclick = function () { cat = n === 'Todos' ? '' : n; [].forEach.call(chips.children, function (x) { x.classList.toggle('on', x === b); }); filtrar(); };
    chips.appendChild(b);
  });
  var vazio = document.createElement('p'); vazio.className = 'sec-note'; vazio.textContent = 'Nenhum app encontrado.'; vazio.hidden = true; main.appendChild(vazio);
  function montar() {
    var f = ler(LF), r = ler(LR), html = '';
    cards.forEach(function (c) { c.classList.toggle('favorito', f.indexOf(c.dataset.app) >= 0); });
    function sec(t, lista) {
      var cs = lista.map(function (a) { return cards.filter(function (c) { return c.dataset.app === a; })[0]; }).filter(Boolean);
      if (!cs.length) return; var h = document.createElement('h2'); h.textContent = t; var g = document.createElement('div'); g.className = 'grid';
      cs.forEach(function (c) { var k = c.cloneNode(true); k.querySelector('.fav').onclick = function (e) { e.preventDefault(); c.querySelector('.fav').click(); }; k.addEventListener('click', function () { var rr = ler(LR).filter(function (x) { return x !== c.dataset.app; }); rr.unshift(c.dataset.app); gravar(LR, rr.slice(0, 8)); }); g.appendChild(k); });
      extra.appendChild(h); extra.appendChild(g);
    }
    extra.innerHTML = ''; sec('★ Favoritos', f); sec('Recentes', r.slice(0, 6));
    filtrar();
  }
  function filtrar() {
    var q = document.getElementById('busca').value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
    var filtro = q || cat; extra.hidden = !!filtro; var n = 0;
    cards.forEach(function (c) { var ok = (!q || c.dataset.busca.indexOf(q) >= 0) && (!cat || c.dataset.cat === cat); c.hidden = !ok; if (ok) n++; });
    [].forEach.call(main.querySelectorAll(':scope > .grid'), function (g) {
      var vis = [].some.call(g.children, function (c) { return !c.hidden; }); g.hidden = !vis;
      var e = g.previousElementSibling; while (e && e.tagName !== 'H2') { if (e.classList.contains('sec-note')) e.hidden = !vis; e = e.previousElementSibling; } if (e) e.hidden = !vis;
    });
    vazio.hidden = n > 0;
  }
  document.getElementById('busca').addEventListener('input', filtrar);
  document.addEventListener('keydown', function (e) { if (e.key === '/' && document.activeElement.tagName !== 'INPUT') { e.preventDefault(); document.getElementById('busca').focus(); } });
  montar();
})();

/* Exportar meus dados: zip com o kv (JSON por app) e todos os arquivos do usuário no Storage. */
document.addEventListener('DOMContentLoaded', function () {
  var sb = window.tudoAbertoSupabase; if (!sb) return;
  var crcT = (function () { var t = new Uint32Array(256); for (var n = 0; n < 256; n++) { var c = n; for (var k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc32(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = crcT[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function zip(files) { // [{name, data: Uint8Array}] — sem compressão (formato "stored")
    var enc = new TextEncoder(), parts = [], central = [], off = 0;
    files.forEach(function (f) {
      var nm = enc.encode(f.name), crc = crc32(f.data), sz = f.data.length;
      var h = new DataView(new ArrayBuffer(30)); h.setUint32(0, 0x04034b50, true); h.setUint16(4, 20, true); h.setUint16(6, 0x0800, true);
      h.setUint32(14, crc, true); h.setUint32(18, sz, true); h.setUint32(22, sz, true); h.setUint16(26, nm.length, true);
      parts.push(new Uint8Array(h.buffer), nm, f.data);
      var c = new DataView(new ArrayBuffer(46)); c.setUint32(0, 0x02014b50, true); c.setUint16(4, 20, true); c.setUint16(6, 20, true); c.setUint16(8, 0x0800, true);
      c.setUint32(16, crc, true); c.setUint32(20, sz, true); c.setUint32(24, sz, true); c.setUint16(28, nm.length, true); c.setUint32(42, off, true);
      central.push(new Uint8Array(c.buffer), nm); off += 30 + nm.length + sz;
    });
    var cs = central.reduce(function (a, x) { return a + x.length; }, 0);
    var e = new DataView(new ArrayBuffer(22)); e.setUint32(0, 0x06054b50, true); e.setUint16(8, files.length, true); e.setUint16(10, files.length, true); e.setUint32(12, cs, true); e.setUint32(16, off, true);
    return new Blob(parts.concat(central, [new Uint8Array(e.buffer)]), { type: 'application/zip' });
  }
  async function listar(prefixo, out) {
    for (var pg = 0; ; pg++) {
      var r = await sb.storage.from('arquivos').list(prefixo, { limit: 1000, offset: pg * 1000 }); if (r.error) throw r.error;
      for (var i = 0; i < r.data.length; i++) { var it = r.data[i], cam = prefixo + '/' + it.name; if (it.id) out.push(cam); else await listar(cam, out); }
      if (r.data.length < 1000) return out;
    }
  }
  async function exportar(btn) {
    var s = (await sb.auth.getSession()).data.session; if (!s) return;
    var uid = s.user.id, enc = new TextEncoder(), files = [], rows = [];
    btn.disabled = true; btn.textContent = 'Exportando…';
    try {
      for (var pg = 0; ; pg++) { var r = await sb.from('kv').select('app,key,value,updated_at').eq('user_id', uid).range(pg * 1000, pg * 1000 + 999); if (r.error) throw r.error; rows = rows.concat(r.data); if (r.data.length < 1000) break; }
      var porApp = {}; rows.forEach(function (x) { (porApp[x.app] = porApp[x.app] || {})[x.key] = x.value; });
      Object.keys(porApp).forEach(function (a) { files.push({ name: 'dados/' + a + '.json', data: enc.encode(JSON.stringify(porApp[a], null, 2)) }); });
      var caminhos = await listar(uid, []);
      for (var i = 0; i < caminhos.length; i++) {
        btn.textContent = 'Baixando arquivos ' + (i + 1) + '/' + caminhos.length + '…';
        var d = await sb.storage.from('arquivos').download(caminhos[i]); if (d.error) throw d.error;
        files.push({ name: 'arquivos/' + caminhos[i].slice(uid.length + 1), data: new Uint8Array(await d.data.arrayBuffer()) });
      }
      files.unshift({ name: 'LEIA-ME.txt', data: enc.encode('Exportação do Tudo Aberto — ' + new Date().toLocaleString('pt-BR') + '\nConta: ' + (s.user.email || 'visitante (demo)') + '\n\ndados/<app>.json: dados salvos por cada app (chave → valor)\narquivos/: seus arquivos enviados\n') });
      var a = document.createElement('a'); a.href = URL.createObjectURL(zip(files)); a.download = 'tudo-aberto-meus-dados-' + new Date().toISOString().slice(0, 10) + '.zip';
      document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 10000);
      btn.textContent = 'Exportado ✓ (' + rows.length + ' registros, ' + caminhos.length + ' arquivos)';
    } catch (e) { alert('Não foi possível exportar: ' + (e.message || e)); btn.textContent = 'Exportar meus dados'; }
    btn.disabled = false;
  }
  var top = document.getElementById('sair'); if (!top) return;
  var b = document.createElement('button'); b.className = 'topbtn'; b.id = 'exportar'; b.textContent = 'Exportar meus dados'; b.title = 'Baixar um .zip com tudo o que você salvou nos apps';
  b.onclick = function () { exportar(b); }; top.parentNode.insertBefore(b, top);
  var f = document.querySelector('footer');
  if (f) { var p = document.createElement('p'); p.className = 'aviso-plano';
    p.innerHTML = '<b>Aviso:</b> os dados ficam num banco Supabase do plano gratuito, que é <b>pausado após 7 dias sem uso</b> (os dados são mantidos, mas o login e o salvamento param até ele ser reativado). Use <b>Exportar meus dados</b> de vez em quando para guardar uma cópia.';
    f.parentNode.insertBefore(p, f); }
});
