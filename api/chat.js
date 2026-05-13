module.exports = async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  if (!process.env.OPENROUTER_API_KEY) {
    return res.status(500).json({ error: "No API key set" });
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://cloud-os-snowy.vercel.app",
      "X-Title": "Cloud OS"
    },
    body: JSON.stringify(req.body)
  });

  res.status(response.status);
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");

  const reader = response.body.getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    res.write(value);
  }
  res.end();
};