import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json({ limit: "100kb" }));
app.use(express.static("public"));

app.post("/api/generate", async (req, res) => {
  const apiKey = process.env.MAGIC_HOUR_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "La clé Magic Hour n'est pas configurée sur le serveur. Ajoute MAGIC_HOUR_API_KEY dans le fichier .env."
    });
  }

  const { prompt, aspect_ratio = "9:16" } = req.body ?? {};
  if (typeof prompt !== "string" || prompt.trim().length < 10 || prompt.length > 8000) {
    return res.status(400).json({ error: "Le texte doit contenir entre 10 et 8000 caractères." });
  }
  if (!["9:16", "16:9", "1:1"].includes(aspect_ratio)) {
    return res.status(400).json({ error: "Format vidéo invalide." });
  }

  try {
    const upstream = await fetch("https://api.magichour.ai/v1/text-to-video", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "FruitVideo AI - Histoire de fruits",
        end_seconds: 3.0,
        aspect_ratio,
        style: { prompt },
        model: "ltx-2.5",
        resolution: "480p",
        audio: true
      })
    });

    const raw = await upstream.text();
    let data;
    try { data = JSON.parse(raw); } catch { data = { message: raw }; }

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: data?.message || data?.error || "Le fournisseur vidéo a refusé la demande.",
        provider_status: upstream.status,
        details: data
      });
    }
    return res.status(202).json(data);
  } catch (error) {
    return res.status(502).json({ error: "Impossible de joindre Magic Hour.", details: error.message });
  }
});

const port = Number(process.env.PORT || 3000);
app.listen(port, "0.0.0.0", () => console.log(`FruitVideo AI disponible sur http://localhost:${port}`));
