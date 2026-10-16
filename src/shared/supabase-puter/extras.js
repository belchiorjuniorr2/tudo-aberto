/* Tudo Aberto — extras injetados em todos os apps: botão flutuante "← Tudo Aberto". */
(function () {
  if (window.top !== window || window.__tudoAbertoExtras) return;
  window.__tudoAbertoExtras = true;
  function botao() {
    if (document.getElementById('tudo-aberto-voltar')) return;
    var a = document.createElement('a');
    a.id = 'tudo-aberto-voltar'; a.href = '/apps/'; a.textContent = '← Tudo Aberto';
    a.title = 'Voltar para a lista de apps (arraste para mover)';
    a.setAttribute('data-ptbr-skip', '');
    var pos = null; try { pos = JSON.parse(localStorage.getItem('tudo-aberto.voltar.pos')); } catch (e) {}
    a.style.cssText = 'position:fixed;z-index:2147483646;left:' + (pos ? pos.x : 12) + 'px;bottom:' + (pos ? pos.y : 12) + 'px;' +
      'padding:6px 12px;border-radius:999px;font:600 13px/1.2 system-ui,sans-serif;color:#fff;background:rgba(20,24,40,.72);' +
      'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 2px 10px rgba(0,0,0,.3);text-decoration:none;opacity:.55;transition:opacity .2s;touch-action:none;user-select:none';
    a.onmouseenter = function () { a.style.opacity = '1'; }; a.onmouseleave = function () { a.style.opacity = '.55'; };
    var drag = null, moved = false;
    a.addEventListener('pointerdown', function (e) { drag = { x: e.clientX, y: e.clientY, l: a.offsetLeft, b: innerHeight - a.offsetTop - a.offsetHeight }; moved = false; a.setPointerCapture(e.pointerId); });
    a.addEventListener('pointermove', function (e) {
      if (!drag) return; var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) moved = true; if (!moved) return;
      a.style.left = Math.max(0, Math.min(innerWidth - a.offsetWidth, drag.l + dx)) + 'px';
      a.style.bottom = Math.max(0, Math.min(innerHeight - a.offsetHeight, drag.b - dy)) + 'px';
    });
    a.addEventListener('pointerup', function () { if (drag && moved) { try { localStorage.setItem('tudo-aberto.voltar.pos', JSON.stringify({ x: parseInt(a.style.left), y: parseInt(a.style.bottom) })); } catch (e) {} } drag = null; });
    a.addEventListener('click', function (e) { if (moved) { e.preventDefault(); moved = false; } });
    document.body.appendChild(a);
  }
  if (document.body) botao(); else document.addEventListener('DOMContentLoaded', botao);
})();
