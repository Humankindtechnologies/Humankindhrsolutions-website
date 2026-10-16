// Vercel serverless function — tells the browser which Cloudflare Turnstile site key to use.
// Env var: TURNSTILE_SITE_KEY (public). Returns null until it's set, and the forms skip the widget.
module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=300');
  res.status(200).json({ siteKey: process.env.TURNSTILE_SITE_KEY || null });
};
