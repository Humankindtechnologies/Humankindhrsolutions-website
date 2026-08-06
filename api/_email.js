// Shared email helpers for the HumanKind website forms.
// Filenames prefixed with "_" are not exposed as Vercel routes — import-only.
//
// Required environment variables (set in Vercel → Settings → Environment Variables):
//   SENDGRID_API_KEY    — your SendGrid API key
//   SENDGRID_FROM_EMAIL — a sender address verified in SendGrid (Single Sender or domain auth)

const TO_EMAIL = 'info@humankindhrsolutions.com';
const BRAND = '#2D6BE0';
const INK = '#1C1D21';
const MUTED = '#63666D';
const LINE = '#E3E3E6';

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

/**
 * Build a branded HTML email.
 * @param {object} opts
 * @param {string} opts.title      Headline shown in the coloured header bar.
 * @param {string} opts.subtitle   Small line under the headline.
 * @param {Array<[string,string]>} opts.rows  Label/value pairs (values already escaped).
 * @param {string} [opts.message]  Optional free-text block (already escaped).
 * @param {string} [opts.messageLabel]
 */
function buildEmail({ title, subtitle, rows, message, messageLabel = 'Message' }) {
  const rowsHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid ${LINE};color:${MUTED};font-size:13px;width:190px;vertical-align:top;">${esc(label)}</td>
          <td style="padding:12px 0;border-bottom:1px solid ${LINE};color:${INK};font-size:14px;font-weight:600;vertical-align:top;">${value}</td>
        </tr>`
    )
    .join('');

  const messageHtml = message
    ? `
      <p style="margin:28px 0 8px;color:${MUTED};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">${esc(messageLabel)}</p>
      <div style="background:#F6F7F9;border-left:3px solid ${BRAND};border-radius:0 8px 8px 0;padding:16px 18px;color:${INK};font-size:14px;line-height:1.65;white-space:pre-wrap;">${message}</div>`
    : '';

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:#EEF0F3;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF0F3;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 4px 18px rgba(20,20,22,.08);font-family:Calibri,'Trebuchet MS',Arial,sans-serif;">
            <tr>
              <td style="background:${BRAND};padding:26px 32px;">
                <div style="color:rgba(255,255,255,.75);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">HumanKind HR Solutions</div>
                <div style="color:#ffffff;font-size:21px;font-weight:700;margin-top:6px;">${esc(title)}</div>
                <div style="color:rgba(255,255,255,.85);font-size:13px;margin-top:4px;">${esc(subtitle)}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${rowsHtml}</table>
                ${messageHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:18px 32px 26px;border-top:1px solid ${LINE};color:${MUTED};font-size:12px;line-height:1.6;">
                Sent automatically from humankindhrsolutions.com. Reply directly to this email to reach the sender.
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

module.exports = { esc, list, buildEmail, sendEmail, TO_EMAIL };
