// Shared email helpers for the HumanKind website forms.
// Filenames prefixed with "_" are not exposed as Vercel routes — import-only.
//
// Required environment variables (set in Vercel → Settings → Environment Variables):
//   SENDGRID_API_KEY    — your SendGrid API key
//   SENDGRID_FROM_EMAIL — a sender address verified in SendGrid (Single Sender or domain auth)
//
// Emails are built from small table-based pieces with inline styles only — the one
// layout approach that renders the same in Gmail, Outlook and Apple Mail.

const TO_EMAIL = 'info@humankindhrsolutions.com';

// Email clients can't load local files — the logo needs a live, absolute URL.
// TODO: swap this to https://humankindhrsolutions.com/... once the domain migration is done.
const LOGO_URL = 'https://humankindhrsolutions-website.vercel.app/images/logos/HK_LOGO.png';

// Brand palette (mirrors :root in styles.css)
const INK = '#1C1D21';
const INK_2 = '#2A2C31';
const BLUE = '#2D6BE0';
const BLUE_SOFT = '#EAF1FF';
const TEXT = '#1F2226';
const MUTED = '#63666D';
const FAINT = '#9A9CA2';
const LINE = '#E3E3E6';
const PAPER = '#F7F7F8';
const BG = '#EEEFF2';
const FONT = "Calibri,'Segoe UI',Helvetica,Arial,sans-serif";

/** Escape user-supplied text before it goes into the HTML email. */
function esc(value) {
  return String(value == null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Render an array as a comma list, or an em dash when empty. */
function list(arr) {
  return Array.isArray(arr) && arr.length ? arr.map(esc).join(', ') : '&mdash;';
}

/** "youssef lakhal" → "Youssef" */
function firstName(name) {
  const first = String(name || '').trim().split(/\s+/)[0] || 'Someone';
  return first.charAt(0).toUpperCase() + first.slice(1);
}

/** "Youssef Lakhal" → "YL" */
function initials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : (parts[0] || '?').slice(0, 2);
  return letters.toUpperCase();
}

/** "Friday, Oct 16 · 11:37 a.m. AT" */
function receivedAt(date = new Date()) {
  const opts = { timeZone: 'America/Halifax' };
  const day = date.toLocaleDateString('en-CA', { ...opts, weekday: 'long', month: 'short', day: 'numeric' });
  const time = date.toLocaleTimeString('en-CA', { ...opts, hour: 'numeric', minute: '2-digit' });
  return `${day} &middot; ${esc(time)} AT`;
}

/* ---------- building blocks ---------- */

function button(href, label, primary) {
  const style = primary
    ? `background:${BLUE};color:#ffffff;border:1px solid ${BLUE};`
    : `background:transparent;color:#ffffff;border:1px solid rgba(255,255,255,.35);`;
  return `<a href="${href}" style="${style}display:inline-block;text-decoration:none;font-family:${FONT};font-size:14px;font-weight:700;padding:12px 22px;border-radius:999px;margin:0 8px 8px 0;">${label}</a>`;
}

/** A labelled white card section. `inner` is already-safe HTML. */
function section(label, inner) {
  return `
    <tr>
      <td style="padding:0 32px 28px;">
        <p style="margin:0 0 12px;color:${FAINT};font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">${label}</p>
        ${inner}
      </td>
    </tr>`;
}

/** Rounded light panel. */
function panel(inner, extra = '') {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};border:1px solid ${LINE};border-radius:14px;${extra}"><tr><td style="padding:18px 20px;">${inner}</td></tr></table>`;
}

/** Label/value rows inside a panel. Values must already be escaped. */
function details(rows) {
  const html = rows
    .filter(([, v]) => v)
    .map(([label, value], i) => `
      <tr>
        <td style="padding:${i ? '12px' : '0'} 0 0;width:92px;color:${FAINT};font-family:${FONT};font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;vertical-align:top;">${label}</td>
        <td style="padding:${i ? '12px' : '0'} 0 0;color:${TEXT};font-family:${FONT};font-size:15px;font-weight:600;vertical-align:top;">${value}</td>
      </tr>`)
    .join('');
  return panel(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0">${html}</table>`);
}

/** Soft-blue rounded chips. */
function pills(items) {
  return items
    .map(t => `<span style="display:inline-block;background:${BLUE_SOFT};color:${BLUE};font-family:${FONT};font-size:13px;font-weight:700;padding:7px 14px;border-radius:999px;margin:0 6px 8px 0;">${esc(t)}</span>`)
    .join('');
}

/** Checkmark list. */
function checklist(items) {
  const rows = items
    .map(t => `
      <tr>
        <td style="width:28px;padding:5px 0;vertical-align:top;">
          <div style="width:18px;height:18px;line-height:18px;border-radius:50%;background:${INK};color:#ffffff;font-size:11px;font-weight:700;text-align:center;font-family:Arial,sans-serif;">&#10003;</div>
        </td>
        <td style="padding:5px 0;color:${TEXT};font-family:${FONT};font-size:15px;line-height:18px;">${esc(t)}</td>
      </tr>`)
    .join('');
  return `<table role="presentation" cellpadding="0" cellspacing="0">${rows}</table>`;
}

/** Calendar tile (MON / 19 / OCT) beside a headline and note. */
function dateCard({ weekday, day, month, headline, note }) {
  const tile = `
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:76px;border-radius:12px;overflow:hidden;border:1px solid ${LINE};background:#ffffff;">
      <tr><td style="background:${BLUE};color:#ffffff;text-align:center;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.12em;padding:5px 0;">${esc(weekday)}</td></tr>
      <tr><td style="text-align:center;color:${INK};font-family:${FONT};font-size:30px;font-weight:800;line-height:1;padding:10px 0 2px;">${esc(day)}</td></tr>
      <tr><td style="text-align:center;color:${MUTED};font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.12em;padding:0 0 9px;">${esc(month)}</td></tr>
    </table>`;
  return panel(`
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
      <td style="width:76px;vertical-align:middle;">${tile}</td>
      <td style="padding-left:18px;vertical-align:middle;">
        <p style="margin:0 0 4px;color:${INK};font-family:${FONT};font-size:19px;font-weight:800;">${headline}</p>
        <p style="margin:0;color:${MUTED};font-family:${FONT};font-size:14px;line-height:1.5;">${note}</p>
      </td>
    </tr></table>`);
}

/** Their message as a quote card. `message` is already escaped. */
function quote(message) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};border:1px solid ${LINE};border-radius:14px;">
      <tr><td style="padding:16px 24px 0;color:${BLUE};font-family:Georgia,serif;font-size:54px;line-height:44px;height:30px;">&ldquo;</td></tr>
      <tr><td style="padding:0 24px 22px;color:${TEXT};font-family:${FONT};font-size:16px;line-height:1.7;white-space:pre-wrap;">${message}</td></tr>
    </table>`;
}

/**
 * The full email: dark hero with avatar + headline + action buttons, then sections.
 * @param {object} o
 * @param {string} o.preheader  Inbox preview text (plain).
 * @param {string} o.badge      Small label top-right of the header (e.g. "Let's Talk request").
 * @param {string} o.name       Sender's full name (for the avatar initials).
 * @param {string} o.title      Headline (already safe HTML).
 * @param {string} o.subtitle   One line under the headline (already safe HTML).
 * @param {string[]} o.actions  Button HTML from button().
 * @param {string[]} o.sections Section HTML from section().
 * @param {string} o.replyName  First name for the footer tip.
 */
function layout({ preheader, badge, name, title, subtitle, actions, sections, replyName }) {
  return `<!doctype html>
<html>
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /><meta name="color-scheme" content="light only" /></head>
  <body style="margin:0;padding:0;background:${BG};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${BG};padding:32px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 12px 40px rgba(20,20,22,.08);">

            <!-- hero -->
            <tr>
              <td style="background:${INK};background-image:linear-gradient(160deg,${INK_2} 0%,${INK} 60%);padding:26px 32px 30px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;"><img src="${LOGO_URL}" alt="HumanKind HR Solutions" width="132" style="display:block;width:132px;height:auto;border:0;" /></td>
                    <td align="right" style="vertical-align:middle;">
                      <span style="display:inline-block;border:1px solid rgba(255,255,255,.22);color:#C7C9CE;font-family:${FONT};font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">${badge}</span>
                    </td>
                  </tr>
                </table>
                <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:34px;">
                  <tr>
                    <td style="vertical-align:middle;padding-right:16px;">
                      <div style="width:58px;height:58px;line-height:58px;border-radius:50%;background:${BLUE};color:#ffffff;text-align:center;font-family:${FONT};font-size:21px;font-weight:800;letter-spacing:.02em;">${esc(initials(name))}</div>
                    </td>
                    <td style="vertical-align:middle;">
                      <h1 style="margin:0;color:#ffffff;font-family:${FONT};font-size:28px;line-height:1.15;font-weight:800;letter-spacing:-.01em;">${title}</h1>
                      <p style="margin:6px 0 0;color:#A9ABB1;font-family:${FONT};font-size:14px;">${subtitle}</p>
                    </td>
                  </tr>
                </table>
                <div style="margin-top:26px;">${actions.join('')}</div>
              </td>
            </tr>

            <tr><td style="height:30px;line-height:30px;font-size:0;">&nbsp;</td></tr>
            ${sections.join('')}

            <!-- footer -->
            <tr>
              <td style="padding:20px 32px 24px;background:${PAPER};border-top:1px solid ${LINE};">
                <p style="margin:0 0 4px;color:${TEXT};font-family:${FONT};font-size:14px;font-weight:700;">Just hit reply &mdash; it goes straight to ${esc(replyName)}.</p>
                <p style="margin:0;color:${FAINT};font-family:${FONT};font-size:12px;">Sent automatically from the HumanKind HR Solutions website.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Send one email through SendGrid.
 * Returns { ok: true } or { ok: false, status, error }.
 */
async function sendEmail({ subject, html, replyTo, replyToName }) {
  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;

  if (!apiKey || !fromEmail) {
    console.error('Missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL env var');
    return { ok: false, status: 500, error: 'Email is not configured' };
  }

  const payload = {
    personalizations: [{ to: [{ email: TO_EMAIL }] }],
    from: { email: fromEmail, name: 'HumanKind Website' },
    subject,
    content: [{ type: 'text/html', value: html }],
  };

  if (replyTo) {
    payload.reply_to = replyToName ? { email: replyTo, name: replyToName } : { email: replyTo };
  }

  try {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error('SendGrid error', res.status, detail);
      return { ok: false, status: 502, error: 'Failed to send email' };
    }
    return { ok: true };
  } catch (err) {
    console.error('SendGrid request failed', err);
    return { ok: false, status: 500, error: 'Unexpected error' };
  }
}

module.exports = {
  esc, list, firstName, receivedAt, layout, section, button, details, pills, checklist, dateCard, quote, sendEmail, TO_EMAIL,
};
