// Vercel serverless function: receives the free audit form and the free business check results,
// and forwards them to your Google Sheet webhook (or any automation tool).
// Set LEAD_WEBHOOK_URL in the Vercel project's Environment Variables. The address stays on the
// server and never appears in the website code.
//
// Two kinds of record are sent on, marked by "kind":
//   "audit": someone asked for a free audit (name, business, contact...)
//   "check": someone finished the business check (score and answers only, no personal details)
module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return res.status(503).json({ ok: false, error: 'Lead webhook is not configured' });

  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch (e) { b = {}; } }
  if (!b || typeof b !== 'object') b = {};
  const clean = (v, max) => String(v == null ? '' : v).slice(0, max);
  const utm = b.utm && typeof b.utm === 'object' ? b.utm : {};
  const common = {
    page: clean(b.page, 200),
    region: clean(b.region, 10),
    utm_source: clean(utm.utm_source, 120),
    utm_medium: clean(utm.utm_medium, 120),
    utm_campaign: clean(utm.utm_campaign, 120),
    utm_content: clean(utm.utm_content, 120),
    receivedAt: new Date().toISOString()
  };

  let record;
  if (b.kind === 'check') {
    // Anonymous business check result: six answers, the score and the services that would fix the gaps.
    const answers = Array.isArray(b.answers) ? b.answers.slice(0, 6).map((a) => clean(a, 10)) : [];
    if (answers.length !== 6) return res.status(400).json({ ok: false, error: 'Incomplete check' });
    record = Object.assign({
      kind: 'check',
      score: Math.max(0, Math.min(6, parseInt(b.score, 10) || 0)),
      answers,
      needs: clean(b.needs, 200)
    }, common);
  } else {
    if (b.company_site) return res.status(200).json({ ok: true }); // honeypot: drop bots quietly
    record = Object.assign({
      kind: 'audit',
      name: clean(b.name, 120),
      business: clean(b.business, 160),
      type: clean(b.type, 60),
      city: clean(b.city, 80),
      contact: clean(b.contact, 160),
      audit: clean(b.audit, 40),
      interest: clean(b.interest, 300),
      message: clean(b.message, 2000)
    }, common);
    if (!record.name || !record.business || !record.contact) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }
  }

  try {
    const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) });
    if (!r.ok) throw new Error('Webhook responded ' + r.status);
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(502).json({ ok: false, error: 'Could not deliver' });
  }
};
