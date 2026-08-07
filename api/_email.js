// Shared email helpers for the HumanKind website forms.
// Filenames prefixed with "_" are not exposed as Vercel routes — import-only.
//
// Required environment variables (set in Vercel → Settings → Environment Variables):
//   SENDGRID_API_KEY    — your SendGrid API key
//   SENDGRID_FROM_EMAIL — a sender address verified in SendGrid (Single Sender or domain auth)

const TO_EMAIL = 'info@humankindhrsolutions.com';

// Email clients can't load local files — the logo needs a live, absolute URL.
// TODO: swap this to https://humankindhrsolutions.com/... once the domain migration is done.
const LOGO_URL = 'https://humankindhrsolutions-website.vercel.app/images/logos/HK_LOGO.png';

const INK = '#0B0B0C';
const MUTED = '#6B6B6E';
const FAINT = '#9A9A9E';
const LINE = '#E4E4E6';
const PAPER = '#FAFAFA';

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
 * Build a premium, black-and-white branded HTML email.
 * @param {object} opts
 * @param {string} opts.eyebrow    Small uppercase label above the title (e.g. "New submission").
 * @param {string} opts.title      Headline shown under the header.
 * @param {string} opts.subtitle   One line of supporting copy.
 * @param {Array<[string,string]>} opts.rows  Label/value pairs (values already escaped/HTML-safe).
 * @param {string} [opts.message]  Optional free-text block (already escaped).
 * @param {string} [opts.messageLabel]
 * @param {string} [opts.replyTo]  If set, adds a "Reply to sender" CTA button.
 * @param {string} [opts.replyToName]
 */
function buildEmail({ eyebrow, title, subtitle, rows, message, messageLabel = 'Message', replyTo, replyToName }) {
  const rowsHtml = rows
    .map(
      ([label, value], i) => `
        <tr>
          <td style="padding:${i === 0 ? '0' : '18px'} 0 18px;border-bottom:1px solid ${LINE};color:${FAINT};font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;width:180px;vertical-align:top;">${esc(label)}</td>
          <td style="padding:${i === 0 ? '0' : '18px'} 0 18px;border-bottom:1px solid ${LINE};color:${INK};font-size:15px;font-weight:600;vertical-align:top;">${value}</td>
        </tr>`
    )
    .join('');

  const messageHtml = message
    ? `
      <tr>
        <td style="padding:28px 0 0;">
          <p style="margin:0 0 10px;color:${FAINT};font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;">${esc(messageLabel)}</p>
          <div style="background:${PAPER};border-left:3px solid ${INK};padding:18px 20px;color:${INK};font-size:15px;line-height:1.7;white-space:pre-wrap;">${message}</div>
        </td>
      </tr>`
    : '';

  const ctaHtml = replyTo
    ? `
      <tr>
        <td style="padding:32px 0 0;">
          <a href="mailto:${esc(replyTo)}" style="display:inline-block;background:${INK};color:#ffffff;text-decoration:none;font-size:13px;font-weight:700;letter-spacing:.03em;padding:14px 28px;border-radius:2px;">
            Reply to ${replyToName ? esc(replyToName.split(' ')[0]) : 'sender'} &rarr;
          </a>
        </td>
      </tr>`
    : '';

  return `<!doctype html>
<html>
  <body style="margin:0;padding:0;background:${PAPER};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PAPER};padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:580px;background:#ffffff;font-family:Calibri,'Trebuchet MS',Arial,sans-serif;">

            <!-- header -->
            <tr>
              <td style="background:${INK};padding:36px 40px;text-align:center;">
                <img src="${LOGO_URL}" alt="HumanKind HR Solutions" width="170" style="display:block;margin:0 auto;width:170px;height:auto;border:0;" />
              </td>
            </tr>

            <!-- title block -->
            <tr>
              <td style="padding:36px 40px 8px;border-bottom:1px solid ${LINE};">
                <p style="margin:0 0 10px;color:${FAINT};font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;">${esc(eyebrow)}</p>
                <h1 style="margin:0 0 8px;color:${INK};font-size:24px;font-weight:800;letter-spacing:-.01em;">${esc(title)}</h1>
                <p style="margin:0 0 28px;color:${MUTED};font-size:14px;">${esc(subtitle)}</p>
              </td>
            </tr>

            <!-- content -->
            <tr>
              <td style="padding:32px 40px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                </table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${messageHtml}
                  ${ctaHtml}
                </table>
              </td>
            </tr>

            <!-- footer -->
            <tr>
              <td style="padding:22px 40px;background:${PAPER};border-top:1px solid ${LINE};">
                <p style="margin:0;color:${FAINT};font-size:11px;line-height:1.6;letter-spacing:.02em;">
                  HUMANKIND HR SOLUTIONS &nbsp;&middot;&nbsp; Sent automatically from humankindhrsolutions.com
                </p>
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
