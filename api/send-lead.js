// Vercel serverless function — receives the "Let's Talk" lead modal and emails it via SendGrid.
// Env vars required: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL (see _email.js).
const { esc, list, buildEmail, sendEmail } = require('./_email');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, areas, needs, preferredDay, preferredWindow } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const reachAt = [preferredDay, preferredWindow].filter(Boolean).map(esc).join(' &middot; ') || '&mdash;';

  const html = buildEmail({
    eyebrow: 'New lead',
    title: "Let's Talk request",
    rows: [
      ['Name', esc(name)],
      ['Email', `<a href="mailto:${esc(email)}" style="color:#0B0B0C;text-decoration:underline;">${esc(email)}</a>`],
      ['Phone', phone ? `<a href="tel:${esc(phone)}" style="color:#0B0B0C;text-decoration:underline;">${esc(phone)}</a>` : '&mdash;'],
      ['Best time to reach them', reachAt],
      ['Areas of interest', list(areas)],
      ['Specific needs', list(needs)],
      ['Received', esc(new Date().toLocaleString('en-CA', { timeZone: 'America/Halifax', dateStyle: 'full', timeStyle: 'short' })) + ' (AT)'],
    ],
    replyTo: email,
    replyToName: name,
  });

  const result = await sendEmail({
    subject: `New lead: ${name}`,
    html,
    replyTo: email,
    replyToName: name,
  });

  if (!result.ok) return res.status(result.status).json({ error: result.error });
  return res.status(200).json({ ok: true });
};
