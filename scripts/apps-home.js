/* /apps: busca, filtro por categoria, favoritos e recentes (localStorage) — estado do filtro na URL (?q=&cat=). */
(function () {
  var main = document.querySelector('main'); if (!main) return;
  var LF = 'tudo-aberto.favoritos', LR = 'tudo-aberto.recentes';
  function ler(k) { try { return JSON.parse(localStorage.getItem(k)) || []; } catch (e) { return []; } }
  function gravar(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function norm(t) { return String(t || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase(); }
  // Sinônimos/termos comuns por app (busca em pt-BR e inglês).
  var EXTRA = {
    spreadsheet: 'excel planilha tabela xlsx csv sheets calc', documents: 'word texto documento docx editor escrever redacao',
    presentation: 'powerpoint slides apresentacao keynote ppt', whiteboard: 'quadro lousa desenho miro', pdf: 'acrobat pdf assinar documento',
    notes: 'nota anotacao caderno onenote evernote', records: 'banco de dados tabela airtable access', meetings: 'video chamada reuniao zoom meet',
    teamchat: 'chat mensagem slack conversa', email: 'email e-mail correio gmail outlook', contacts: 'contato agenda telefone', calendar: 'calendario agenda evento compromisso',
    signatures: 'assinatura assinar docusign', 'photo-studio': 'foto imagem photoshop editor', 'video-studio': 'video filme edicao premiere capcut',
    'vector-studio': 'vetor illustrator svg desenho logo', 'audio-studio': 'audio som gravacao', 'music-studio': 'musica som beat daw', '3d': '3d modelagem blender maya',
    cad: 'cad desenho tecnico autocad engenharia', parametric: 'cad 3d solidworks peca', circuits: 'circuito eletronica pcb placa', 'building-design': 'arquitetura planta casa revit bim',
    tasks: 'tarefa todo lista afazeres', projects: 'projeto kanban trello quadro', wiki: 'wiki notion documentacao base de conhecimento', 'time-tracking': 'horas tempo ponto timesheet',
    survey: 'pesquisa formulario questionario forms', accounting: 'contabilidade financas contas', invoicing: 'fatura nota cobranca invoice', expense: 'despesa gasto reembolso',
    'cap-table': 'acoes socios startup equity', crm: 'clientes vendas funil crm', 'help-desk': 'suporte atendimento ticket chamado', contracts: 'contrato juridico',
    pos: 'caixa pdv vendas loja ponto de venda', inventory: 'estoque produtos inventario', hiring: 'recrutamento vagas candidatos rh', shifts: 'escala turnos plantao funcionarios',
    childcare: 'creche escola criancas', 'field-service': 'servico tecnico ordem de servico campo', legal: 'advocacia juridico processos', fleet: 'frota veiculos carros manutencao',
    'property-management': 'imoveis aluguel inquilinos', 'api-client': 'api http rest postman requisicao', chess: 'xadrez jogo tabuleiro', backgammon: 'gamao jogo tabuleiro',
    checkers: 'damas jogo tabuleiro', solitaire: 'paciencia cartas baralho jogo', sudoku: 'sudoku jogo numeros puzzle',
    cadcraft: 'cad autocad desenho tecnico dxf', deckcraft: 'powerpoint slides apresentacao', designcraft: 'indesign diagramacao revista livro', effectcraft: 'after effects efeitos motion video',
    figcraft: 'figma interface ui ux prototipo', filmcraft: 'video filme premiere edicao', gridcraft: 'excel planilha tabela', lightcraft: 'lightroom foto raw revelacao',
    photocraft: 'photoshop foto imagem psd', soundcraft: 'audio som audition gravacao', vectorcraft: 'illustrator vetor svg', wordcraft: 'word texto documento docx'
  };
  var cards = [].slice.call(main.querySelectorAll('.grid a.card')), cats = [];
  cards.forEach(function (c) {
    var g = c.parentElement, h = g.previousElementSibling; while (h && h.tagName !== 'H2') h = h.previousElementSibling;
    c.dataset.cat = h ? h.textContent : ''; if (cats.indexOf(c.dataset.cat) < 0) cats.push(c.dataset.cat);
    c.dataset.app = c.getAttribute('href').split('/')[1];
    c.dataset.busca = norm(c.textContent + ' ' + c.dataset.cat + ' ' + c.dataset.app.replace(/-/g, ' ') + ' ' + (EXTRA[c.dataset.app] || ''));
    var s = document.createElement('button'); s.className = 'fav'; s.type = 'button';
    s.onclick = function (e) { e.preventDefault(); e.stopPropagation(); var f = ler(LF), i = f.indexOf(c.dataset.app); if (i < 0) f.push(c.dataset.app); else f.splice(i, 1); gravar(LF, f); atualizar(); };
    c.appendChild(s);
  });
  main.addEventListener('click', function (e) { var c = e.target.closest('a.card'); if (!c || e.target.closest('.fav')) return; var r = ler(LR).filter(function (x) { return x !== c.dataset.app; }); r.unshift(c.dataset.app); gravar(LR, r.slice(0, 8)); });
  var bar = document.createElement('div'); bar.id = 'ferr';
  bar.innerHTML = '<div class="buscawrap"><input id="busca" type="search" autocomplete="off" placeholder="Buscar apps (ex.: planilha, Excel, Photoshop, jogo)…" aria-label="Buscar apps"><button id="limpar" type="button" aria-label="Limpar busca e filtro" hidden>✕</button></div><div id="chips" role="tablist"></div><p id="contagem" aria-live="polite"></p>';
  main.insertBefore(bar, main.firstChild);
  var extra = document.createElement('div'); extra.id = 'pessoais'; main.insertBefore(extra, bar.nextSibling);
  var vazio = document.createElement('p'); vazio.id = 'vazio'; vazio.hidden = true; main.appendChild(vazio);
  var inp = bar.querySelector('#busca'), chips = bar.querySelector('#chips'), cont = bar.querySelector('#contagem'), limpar = bar.querySelector('#limpar');
  var ESPECIAIS = ['★ Favoritos', 'Recentes'], cat = '';
  function chipList() {
    var f = ler(LF), r = ler(LR), lista = ['Todos'];
    if (f.length) lista.push('★ Favoritos'); if (r.length) lista.push('Recentes');
    if ((cat === '★ Favoritos' && !f.length) || (cat === 'Recentes' && !r.length)) cat = '';
    chips.innerHTML = '';
    lista.concat(cats).forEach(function (n) {
      var b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.setAttribute('role', 'tab');
      var on = (n === 'Todos' && !cat) || n === cat; if (on) b.classList.add('on'); b.setAttribute('aria-selected', on);
      var qtd = n === 'Todos' ? cards.length : n === '★ Favoritos' ? f.length : n === 'Recentes' ? Math.min(r.length, 8) : cards.filter(function (c) { return c.dataset.cat === n; }).length;
      b.innerHTML = '<span></span> <small></small>'; b.firstChild.textContent = n; b.lastChild.textContent = qtd;
      b.onclick = function () { cat = n === 'Todos' ? '' : n; atualizar(); b.scrollIntoView({ inline: 'nearest', block: 'nearest' }); };
      chips.appendChild(b);
    });
  }
  function secao(t, lista) {
    var cs = lista.map(function (a) { return cards.filter(function (c) { return c.dataset.app === a; })[0]; }).filter(Boolean);
    if (!cs.length) return; var h = document.createElement('h2'); h.textContent = t; var g = document.createElement('div'); g.className = 'grid';
    cs.forEach(function (c) { var k = c.cloneNode(true); k.querySelector('.fav').onclick = function (e) { e.preventDefault(); e.stopPropagation(); c.querySelector('.fav').click(); }; g.appendChild(k); });
    extra.appendChild(h); extra.appendChild(g);
  }
  function salvarEstado(q) {
    var u = new URL(location.href); q ? u.searchParams.set('q', q) : u.searchParams.delete('q'); cat ? u.searchParams.set('cat', cat) : u.searchParams.delete('cat');
    history.replaceState(null, '', u.pathname + (u.search || '') + u.hash);
    try { sessionStorage.setItem('tudo-aberto.filtro', JSON.stringify({ q: q, cat: cat })); } catch (e) {}
  }
  function atualizar() {
    var f = ler(LF), r = ler(LR).slice(0, 8);
    cards.forEach(function (c) { var fav = f.indexOf(c.dataset.app) >= 0; c.classList.toggle('favorito', fav); var b = c.querySelector('.fav'); b.setAttribute('aria-label', fav ? 'Remover dos favoritos' : 'Favoritar'); b.title = b.getAttribute('aria-label'); });
    chipList();
    var qRaw = inp.value.trim(), termos = norm(qRaw).split(/\s+/).filter(Boolean);
    var especial = ESPECIAIS.indexOf(cat) >= 0 ? (cat === 'Recentes' ? r : f) : null;
    // Seções pessoais (Favoritos/Recentes no topo) só na visão "Todos" sem busca.
    extra.innerHTML = ''; if (!qRaw && !cat) { secao('★ Favoritos', f); secao('Recentes', r.slice(0, 6)); }
    var n = 0;
    cards.forEach(function (c) {
      var ok = termos.every(function (t) { return c.dataset.busca.indexOf(t) >= 0; }) &&
        (!cat || (especial ? especial.indexOf(c.dataset.app) >= 0 : c.dataset.cat === cat));
      c.hidden = !ok; if (ok) n++;
    });
    [].forEach.call(main.querySelectorAll(':scope > .grid'), function (g) {
      var vis = [].some.call(g.children, function (c) { return !c.hidden; }); g.hidden = !vis;
      for (var e = g.previousElementSibling; e && e.id !== 'pessoais' && e.id !== 'ferr' && !e.classList.contains('grid'); e = e.previousElementSibling) { e.hidden = !vis; if (e.tagName === 'H2') break; }
    });
    var filtrando = !!(qRaw || cat);
    cont.textContent = filtrando ? (n === 1 ? '1 app encontrado' : n + ' apps encontrados') + (cat ? ' em ' + cat : '') + (qRaw ? ' para “' + qRaw + '”' : '') : cards.length + ' apps';
    vazio.hidden = n > 0; limpar.hidden = !filtrando;
    vazio.innerHTML = ''; if (!n) { vazio.append('Nenhum app encontrado' + (qRaw ? ' para “' + qRaw + '”' : '') + (cat ? ' em ' + cat : '') + '. '); var b = document.createElement('button'); b.type = 'button'; b.className = 'topbtn'; b.textContent = 'Limpar filtros'; b.onclick = limpa; vazio.append(b); }
    salvarEstado(qRaw);
  }
  function limpa() { inp.value = ''; cat = ''; atualizar(); inp.focus(); }
  limpar.onclick = limpa;
  inp.addEventListener('input', atualizar);
  inp.addEventListener('keydown', function (e) { if (e.key === 'Escape') limpa(); });
  document.addEventListener('keydown', function (e) { if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); inp.focus(); } });
  // Estado inicial: URL (?q=&cat=) ou o último filtro da sessão.
  var p = new URLSearchParams(location.search), st = {};
  try { st = JSON.parse(sessionStorage.getItem('tudo-aberto.filtro')) || {}; } catch (e) {}
  inp.value = p.has('q') || p.has('cat') ? (p.get('q') || '') : (st.q || '');
  cat = p.has('q') || p.has('cat') ? (p.get('cat') || '') : (st.cat || '');
  if (cat && cats.indexOf(cat) < 0 && ESPECIAIS.indexOf(cat) < 0) cat = '';
  atualizar();
})();
