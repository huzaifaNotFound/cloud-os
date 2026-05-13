export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + process.env.OPENROUTER_API_KEY,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://vercel.com/mohammadhuzaifa9009-5496s-projects/cloud-os",
      "X-Title": "Cloud OS"
    },
    body: JSON.stringify(req.body)
  });

  const data = await response.json();
  res.status(response.status).json(data);
}
