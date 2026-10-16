// Vercel serverless function — receives the Contact Us form and emails it via SendGrid.
// Env vars required: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL (see _email.js).
const { esc, firstName, receivedAt, layout, section, button, details, quote, sendEmail } = require('./_email');
const { blockSpam } = require('./_spam');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  if (await blockSpam(req, res, { text: [name, company, message], minMs: 3000 })) return;

  const first = firstName(name);
  const html = layout({
    preheader: String(message).slice(0, 140),
    badge: 'Website message',
    name,
    title: `${esc(first)} sent you a message`,
    subtitle: `${company ? esc(company) + ' &middot; ' : ''}${receivedAt()}`,
    actions: [button(`mailto:${esc(email)}`, `Reply to ${esc(first)} &rarr;`, true)],
    sections: [
      section('Their message', quote(esc(message))),
      section('Contact details', details([
        ['Name', esc(name)],
        ['Email', `<a href="mailto:${esc(email)}" style="color:#2D6BE0;text-decoration:none;">${esc(email)}</a>`],
        ['Company', company ? esc(company) : ''],
      ])),
    ],
    replyName: first,
  });

  const result = await sendEmail({
    subject: `${first} sent a message${company ? ' · ' + company : ''}`,
    html,
    replyTo: email,
    replyToName: name,
  });

  if (!result.ok) return res.status(result.status).json({ error: result.error });
  return res.status(200).json({ ok: true });
};
