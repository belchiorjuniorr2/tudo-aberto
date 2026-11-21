// Tudo Aberto: tradutor de interface pt-BR do ArtCraft.
// Mesmo método dos outros apps do Tudo Aberto (src/shared/supabase-puter/ptbr.js): troca só o texto
// VISÍVEL do DOM (nós de texto e atributos de interface) por correspondência exata num dicionário.
// Não altera código, chaves, rotas, prompts nem conteúdo digitado pelo usuário.
// Dicionário: gerado por scripts/artcraft-i18n.py a partir de i18n/comum.json + i18n/apps/artcraft.json.
// Para ver a interface original em inglês: localStorage.setItem("tudoAberto:idioma", "en") e recarregue.
import dicionario from "./ptbr-dicionario.json";

declare global {
  interface Window {
    __tudoAbertoPtBR?: boolean;
  }
}

export function iniciarTraducaoPtBR() {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  if (window.__tudoAbertoPtBR) return;
  try {
    if (localStorage.getItem("tudoAberto:idioma") === "en") return;
  } catch {
    /* localStorage indisponível: segue traduzindo */
  }
  window.__tudoAbertoPtBR = true;
  document.documentElement.lang = "pt-BR";

  const D: Record<string, string> = Object.assign(
    Object.create(null),
    dicionario as Record<string, string>,
  );
  const ATTRS = [
    "title",
    "placeholder",
    "aria-label",
    "alt",
    "data-tooltip",
    "data-title",
    "aria-description",
    "label",
  ];
  const SKIP =
    "script,style,code,pre,textarea,input,[contenteditable],[contenteditable] *,[translate=no],.notranslate,[role=textbox],.cm-editor,.ProseMirror,.monaco-editor,canvas";

  const look = (s: string | null): string | null => {
    if (!s) return null;
    const t = s.trim();
    if (!t || t.length > 200) return null;
    let v: string | undefined = D[t];
    if (v == null) {
      const m = t.match(/^(.*?)(\s*[:…]|\.{2,3})$/);
      if (m && D[m[1]] != null) v = D[m[1]] + m[2];
    }
    if (v == null) return null;
    return s.replace(t, v);
  };
  const skipEl = (el: Element | null) => {
    try {
      return !el || !!el.closest(SKIP);
    } catch {
      return false;
    }
  };
  const textNode = (n: Node) => {
    const p = n.parentElement;
    if (!p || skipEl(p)) return;
    const r = look(n.nodeValue);
    if (r != null && r !== n.nodeValue) n.nodeValue = r;
  };
  const attrs = (el: Element) => {
    if (skipEl(el) && !el.matches("input,textarea")) return;
    for (const a of ATTRS) {
      const v = el.getAttribute(a);
      if (v) {
        const r = look(v);
        if (r != null && r !== v) el.setAttribute(a, r);
      }
    }
    if (
      el instanceof HTMLInputElement &&
      /^(button|submit|reset)$/i.test(el.type) &&
      el.value
    ) {
      const r = look(el.value);
      if (r) el.value = r;
    }
  };
  const obs = new MutationObserver((ms) => {
    for (const m of ms) {
      if (m.type === "childList") m.addedNodes.forEach(walk);
      else if (m.type === "characterData") textNode(m.target);
      else if (m.type === "attributes") attrs(m.target as Element);
    }
    const t = look(document.title);
    if (t && t !== document.title) document.title = t;
  });
  const observe = (root: Node) =>
    obs.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS,
    });
  function walk(root: Node) {
    if (root.nodeType === 3) return textNode(root);
    if (root.nodeType !== 1 && root.nodeType !== 11) return;
    if (root.nodeType === 1) attrs(root as Element);
    const w = document.createTreeWalker(
      root,
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT,
    );
    let n: Node | null;
    while ((n = w.nextNode())) {
      if (n.nodeType === 3) textNode(n);
      else {
        attrs(n as Element);
        const sr = (n as Element).shadowRoot;
        if (sr) {
          walk(sr);
          observe(sr);
        }
      }
    }
  }
  for (const k of ["alert", "confirm", "prompt"] as const) {
    const f = window[k] as (...args: unknown[]) => unknown;
    (window as unknown as Record<string, unknown>)[k] = function (
      msg: unknown,
      ...rest: unknown[]
    ) {
      return f.call(
        window,
        typeof msg === "string" ? (look(msg) ?? msg) : msg,
        ...rest,
      );
    };
  }
  const start = () => {
    walk(document.documentElement);
    observe(document.documentElement);
  };
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", start);
  else start();
}

