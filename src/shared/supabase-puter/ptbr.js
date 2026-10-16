// Tradutor de interface pt-BR do Tudo Aberto. Troca só texto VISÍVEL no DOM (nós de texto e atributos de UI)
// por correspondência exata num dicionário; não altera código, chaves, rotas nem conteúdo do usuário.
(function () {
  if (window.__tudoAbertoPtBR) return; window.__tudoAbertoPtBR = true;
  const app = location.pathname.split('/').filter(Boolean)[0] || '';
  let D = null;
  const ATTRS = ['title', 'placeholder', 'aria-label', 'alt', 'data-tooltip', 'data-title', 'aria-description', 'label'];
  const SKIP = 'script,style,code,pre,textarea,input,select option[value=""] ,[contenteditable],[contenteditable] *,[translate=no],.notranslate,[role=gridcell],[role=textbox],.cm-editor,.ProseMirror,.monaco-editor,canvas';
  const skipSel = SKIP.replace(/select option\[value=""\] ,/, '');
  const look = (s) => {
    if (!s) return null; const t = s.trim(); if (!t || t.length > 200) return null;
    let v = D[t];
    if (v == null) { const m = t.match(/^(.*?)(\s*[:…]|\.{3})$/); if (m && D[m[1]] != null) v = D[m[1]] + m[2]; }
    if (v == null) return null;
    return s.replace(t, v);
  };
  const skipEl = (el) => { try { return !el || el.closest(skipSel); } catch { return false; } };
  function textNode(n) {
    const p = n.parentElement; if (!p || skipEl(p)) return;
    const r = look(n.nodeValue); if (r != null && r !== n.nodeValue) n.nodeValue = r;
  }
  function attrs(el) {
    if (skipEl(el) && !(el.matches && el.matches('input,textarea'))) return;
    for (const a of ATTRS) { const v = el.getAttribute && el.getAttribute(a); if (v) { const r = look(v); if (r != null && r !== v) el.setAttribute(a, r); } }
    if (el.tagName === 'INPUT' && /^(button|submit|reset)$/i.test(el.type) && el.value) { const r = look(el.value); if (r) el.value = r; }
  }
  function walk(root) {
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) attrs(root);
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT);
    let n; while ((n = w.nextNode())) { if (n.nodeType === 3) textNode(n); else { attrs(n); if (n.shadowRoot) { walk(n.shadowRoot); observe(n.shadowRoot); } } }
  }
  const obs = new MutationObserver((ms) => {
    for (const m of ms) {
      if (m.type === 'childList') m.addedNodes.forEach(walk);
      else if (m.type === 'characterData') textNode(m.target);
      else if (m.type === 'attributes') attrs(m.target);
    }
    const t = look(document.title); if (t && t !== document.title) document.title = t;
  });
  const observe = (root) => obs.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  for (const k of ['alert', 'confirm', 'prompt']) { const f = window[k]; window[k] = function (msg, ...rest) { return f.call(window, D && typeof msg === 'string' ? (look(msg) ?? msg) : msg, ...rest); }; }
  function start() { walk(document.documentElement); observe(document.documentElement); const t = look(document.title); if (t) document.title = t; }
  Promise.all(['comum', app].filter(Boolean).map((n) => fetch(`/_i18n/${n}.json`).then((r) => (r.ok ? r.json() : {})).catch(() => ({}))))
    .then(([c, a]) => { D = Object.assign(Object.create(null), c, a || {}); if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start(); });
})();
