// Spam protection shared by the website forms.
// Filenames prefixed with "_" are not exposed as Vercel routes — import-only.
//
// Layers, cheapest first:
//   1. Honeypot  — a hidden "website" field real visitors never see. Bots fill it.
//   2. Speed     — the browser sends how long the form was open. Bots submit instantly
//                  (or post straight to the API and send nothing at all).
//   3. Content   — link-stuffed messages, foreign-script spam, SEO/crypto pitches.
//   4. Turnstile — Cloudflare's free bot check. Only enforced once TURNSTILE_SECRET_KEY
//                  is set in Vercel → Settings → Environment Variables.
//
// Layers 1–3 fail "silently": the bot gets a normal success response so it has no
// reason to adapt, and nothing is emailed. Turnstile failures return a real error,
// because a human can just try again.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINK_RE = /(https?:\/\/|www\.)/gi;
// Cyrillic, CJK, Hangul, Thai, Arabic — none of which a Halifax HR inquiry needs.
const FOREIGN_SCRIPT_RE = /[Ѐ-ӿ฀-๿؀-ۿ぀-ヿ㐀-鿿가-힯]/;
const SPAM_WORDS_RE = new RegExp(
  [
    '\\bseo\\b', 'backlinks?', 'guest post', 'first page of google', 'rank(ing)? (your|on) (website|google)',
    'web ?(site)? ?(design|development) services', 'lead generation', 'increase (your )?(traffic|sales)',
    'crypto', 'bitcoin', 'forex', 'casino', 'viagra', 'cialis', 'porn', 'loan offer', 'unsubscribe',
  ].join('|'),
  'i'
);

/**
 * Decide whether a form submission is spam.
 * @param {object} req       The incoming request (for Turnstile's remote IP).
 * @param {object} body      Parsed request body.
 * @param {object} opts
 * @param {string[]} opts.text   Free-text values to scan (name, company, message…).
 * @param {number}  opts.minMs   Fastest a real person could plausibly fill the form.
 * @returns {Promise<{ok:true} | {ok:false, silent:true, reason:string} | {ok:false, status:number, error:string, code:string}>}
 */
async function checkSpam(req, body, { text, minMs }) {
  const silent = (reason) => ({ ok: false, silent: true, reason });

  if (body.website) return silent('honeypot');

  const elapsed = Number(body.elapsed);
  if (!Number.isFinite(elapsed) || elapsed < minMs) return silent(`too fast (${body.elapsed}ms)`);

  if (!EMAIL_RE.test(String(body.email || ''))) {
    return { ok: false, status: 400, error: 'Please enter a valid email address', code: 'email' };
  }

  const name = String(body.name || '');
  if (name.length > 80 || /https?:\/\/|www\./i.test(name)) return silent('suspicious name');

  const all = text.filter(Boolean).join('\n');
  if ((all.match(LINK_RE) || []).length >= 3) return silent('too many links');
  if (FOREIGN_SCRIPT_RE.test(all)) return silent('foreign script');
  if (SPAM_WORDS_RE.test(all)) return silent('spam keywords');

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (secret) {
    const passed = await verifyTurnstile(secret, body.turnstileToken, clientIp(req));
    if (!passed) {
      return { ok: false, status: 400, error: 'Verification failed — please try again', code: 'captcha' };
    }
  }

  return { ok: true };
}

async function verifyTurnstile(secret, token, ip) {
  if (!token) return false;
  try {
    const form = new URLSearchParams({ secret, response: String(token) });
    if (ip) form.set('remoteip', ip);
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
    const data = await res.json();
    if (!data.success) console.warn('Turnstile rejected', data['error-codes']);
    return data.success === true;
  } catch (err) {
    console.error('Turnstile request failed', err);
    return false;
  }
}

function clientIp(req) {
  const fwd = req.headers && req.headers['x-forwarded-for'];
  return fwd ? String(fwd).split(',')[0].trim() : '';
}

/**
 * Run the checks and, if the submission is rejected, answer the request.
 * Returns true when the handler should stop.
 */
async function blockSpam(req, res, opts) {
  const result = await checkSpam(req, req.body || {}, opts);
  if (result.ok) return false;
  if (result.silent) {
    console.warn('Spam blocked:', result.reason, '—', (req.body && req.body.email) || 'no email');
    res.status(200).json({ ok: true });
  } else {
    res.status(result.status).json({ error: result.error, code: result.code });
  }
  return true;
}

module.exports = { checkSpam, blockSpam };
