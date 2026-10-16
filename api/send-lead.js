// Vercel serverless function — receives the "Let's Talk" modal and emails it via SendGrid.
// Env vars required: SENDGRID_API_KEY, SENDGRID_FROM_EMAIL (see _email.js).
const { esc, firstName, receivedAt, layout, section, button, details, pills, checklist, dateCard, sendEmail } = require('./_email');
const { blockSpam } = require('./_spam');

// Mirrors SLOTS in script.js.
const WINDOW_HOURS = { Morning: '8&ndash;11am', Afternoon: '11am&ndash;4pm', Evening: '4&ndash;7pm' };

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, areas, needs, preferredDay, preferredWindow } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  if (await blockSpam(req, res, { text: [name, phone], minMs: 4000 })) return;

  const first = firstName(name);
  const areaList = Array.isArray(areas) ? areas : [];
  const needList = Array.isArray(needs) ? needs : [];
  const hours = WINDOW_HOURS[preferredWindow];

  const sections = [];

  // preferredDay arrives as "Monday, October 19" — split it for the calendar tile.
  const day = /^(\w+), (\w+) (\d+)$/.exec(String(preferredDay || ''));
  if (day) {
    sections.push(section('Best time to reach them', dateCard({
      weekday: day[1].slice(0, 3).toUpperCase(),
      day: day[3],
      month: day[2].slice(0, 3).toUpperCase(),
      headline: `${esc(day[1])} ${preferredWindow ? esc(preferredWindow).toLowerCase() : ''}`,
      note: `${hours ? hours + ' Atlantic &middot; ' : ''}by phone or email`,
    })));
  } else if (preferredDay || preferredWindow) {
    sections.push(section('Best time to reach them', details([['When', esc([preferredDay, preferredWindow].filter(Boolean).join(' · '))]])));
  }

  if (areaList.length || needList.length) {
    sections.push(section('What they need help with',
      pills(areaList) + (needList.length ? `<div style="margin-top:8px;">${checklist(needList)}</div>` : '')));
  }

  sections.push(section('Contact details', details([
    ['Name', esc(name)],
    ['Email', `<a href="mailto:${esc(email)}" style="color:#2D6BE0;text-decoration:none;">${esc(email)}</a>`],
    ['Phone', phone ? `<a href="tel:${esc(phone)}" style="color:#2D6BE0;text-decoration:none;">${esc(phone)}</a>` : ''],
  ])));

  const actions = [button(`mailto:${esc(email)}`, `Email ${esc(first)} &rarr;`, true)];
  if (phone) actions.push(button(`tel:${esc(phone)}`, `Call ${esc(phone)}`, false));

  const html = layout({
    preheader: `${preferredDay ? 'Reach them ' + preferredDay + (preferredWindow ? ', ' + preferredWindow.toLowerCase() : '') + '. ' : ''}Interested in ${areaList.join(', ') || 'a conversation'}.`,
    badge: "Let's Talk request",
    name,
    title: `${esc(first)} wants to talk`,
    subtitle: `Booked through the website &middot; ${receivedAt()}`,
    actions,
    sections,
    replyName: first,
  });

  const result = await sendEmail({
    subject: `${first} wants to talk${areaList.length ? ' · ' + areaList.join(', ') : ''}`,
    html,
    replyTo: email,
    replyToName: name,
  });

  if (!result.ok) return res.status(result.status).json({ error: result.error });
  return res.status(200).json({ ok: true });
};
