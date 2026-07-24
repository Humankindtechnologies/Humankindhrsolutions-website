// Vercel serverless function — receives the "Let's Talk" lead form and emails it via SendGrid.
// Required environment variables (set in Vercel project settings, never in code):
//   SENDGRID_API_KEY    — your SendGrid API key
//   SENDGRID_FROM_EMAIL — a sender address verified in SendGrid (Single Sender or domain auth)
const TO_EMAIL = 'info@humankindhrsolutions.com';

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, areas, needs, preferredDay, preferredWindow } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.SENDGRID_FROM_EMAIL;
  if (!apiKey || !fromEmail) {
    console.error('Missing SENDGRID_API_KEY or SENDGRID_FROM_EMAIL env var');
    return res.status(500).json({ error: 'Email is not configured' });
  }

  const esc = (s) => String(s || '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));
  const list = (arr) => (Array.isArray(arr) && arr.length ? arr.map(esc).join(', ') : '—');

  const html = `
    <h2>New "Let's Talk" request</h2>
    <p><strong>Name:</strong> ${esc(name)}</p>
    <p><strong>Email:</strong> ${esc(email)}</p>
    <p><strong>Phone:</strong> ${esc(phone) || '—'}</p>
    <p><strong>Area(s):</strong> ${list(areas)}</p>
    <p><strong>Specifics:</strong> ${list(needs)}</p>
    <p><strong>Best time to reach them:</strong> ${esc(preferredDay)}, ${esc(preferredWindow)}</p>
  `;

  try {
    const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL }] }],
        from: { email: fromEmail, name: 'HumanKind Website' },
        reply_to: { email, name },
        subject: `New lead: ${name}`,
        content: [{ type: 'text/html', value: html }],
      }),
    });

    if (!sgRes.ok) {
      const detail = await sgRes.text().catch(() => '');
      console.error('SendGrid error', sgRes.status, detail);
      return res.status(502).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('send-lead error', err);
    return res.status(500).json({ error: 'Unexpected error' });
  }
};
