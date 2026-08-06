// Vercel serverless function — receives the Contact Us form and emails it via SendGrid.
// Env vars required: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL (see _email.js).
const { esc, buildEmail, sendEmail } = require('./_email');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, company, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email and message are required' });
  }

  const html = buildEmail({
    title: 'New contact form message',
    subtitle: 'Submitted from the Contact page',
    rows: [
      ['Name', esc(name)],
      ['Email', `<a href="mailto:${esc(email)}" style="color:#2D6BE0;text-decoration:none;">${esc(email)}</a>`],
      ['Company', company ? esc(company) : '&mdash;'],
      ['Received', esc(new Date().toLocaleString('en-CA', { timeZone: 'America/Halifax', dateStyle: 'full', timeStyle: 'short' })) + ' (AT)'],
    ],
    message: esc(message),
    messageLabel: 'How can we help?',
  });

  const result = await sendEmail({
    subject: `Contact form: ${name}${company ? ' — ' + company : ''}`,
    html,
    replyTo: email,
    replyToName: name,
  });

  if (!result.ok) return res.status(result.status).json({ error: result.error });
  return res.status(200).json({ ok: true });
};
