// Obtém um token do Cloudflare Turnstile quando CAPTCHA_SITE_KEY está definido; senão devolve undefined (desligado).
import { CAPTCHA_SITE_KEY } from './config.js';
let script;
export function captchaToken() {
  if (!CAPTCHA_SITE_KEY) return Promise.resolve(undefined);
  script = script || new Promise((ok, falha) => { const s = document.createElement('script'); s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'; s.onload = ok; s.onerror = falha; document.head.appendChild(s); });
  return script.then(() => new Promise((ok, falha) => {
    const box = document.createElement('div');
    box.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.35)';
    document.body.appendChild(box);
    window.turnstile.render(box.appendChild(document.createElement('div')), { sitekey: CAPTCHA_SITE_KEY, language: 'pt-br',
      callback: (t) => { box.remove(); ok(t); }, 'error-callback': () => { box.remove(); falha(new Error('Falha na verificação anti-robô')); } });
  }));
}
