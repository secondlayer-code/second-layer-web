// Vercel serverless function: receives the audit form and forwards it to your automation webhook.
// Set LEAD_WEBHOOK_URL in the Vercel project's Environment Variables (for example a Make, Zapier,
// n8n or Google Apps Script webhook that adds a row to a Google Sheet and sends you an alert).
// The address stays on the server and never appears in the website code.
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return res.status(503).json({ ok: false, error: 'Lead webhook is not configured' });

  const b = req.body && typeof req.body === 'object' ? req.body : {};
  const clean = (v, max) => String(v == null ? '' : v).slice(0, max);
  if (b.company_site) return res.status(200).json({ ok: true }); // honeypot
  const lead = {
    name: clean(b.name, 120),
    business: clean(b.business, 160),
    type: clean(b.type, 60),
    city: clean(b.city, 80),
    contact: clean(b.contact, 160),
    audit: clean(b.audit, 40),
    interest: clean(b.interest, 160),
    message: clean(b.message, 2000),
    page: clean(b.page, 200),
    region: clean(b.region, 10),
    utm_source: clean(b.utm && b.utm.utm_source, 120),
    utm_medium: clean(b.utm && b.utm.utm_medium, 120),
    utm_campaign: clean(b.utm && b.utm.utm_campaign, 120),
    utm_content: clean(b.utm && b.utm.utm_content, 120),
    receivedAt: new Date().toISOString()
  };
  if (!lead.name || !lead.business || !lead.contact) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' });
  }
  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(lead) });
    if (!r.ok) throw new Error('Webhook responded ' + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Could not deliver lead' });
  }
};
