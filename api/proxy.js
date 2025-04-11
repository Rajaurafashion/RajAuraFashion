export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const forward = await fetch('https://script.google.com/macros/s/AKfycbxvDk1gemZV8XNqU_VEuOcPtCfd2EaN3q6gAkraztsyRUzXJOfjBETuLIpqCGEnV5CNfg/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      const result = await forward.text();
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.status(200).send(result);
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  }

  res.setHeader('Allow', 'POST, OPTIONS');
  res.status(405).end('Method Not Allowed');
}
