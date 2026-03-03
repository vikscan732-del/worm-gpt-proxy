module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const targetUrl = 'https://worm-gpt-flip.vercel.app/api/chat';

  try {
    const body = new URLSearchParams(req.body);
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString()
    });

    if (!response.ok) {
      throw new Error(`Target API error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
