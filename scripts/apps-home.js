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
