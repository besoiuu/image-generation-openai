import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const STABILITY_API_KEY = process.env.STABILITY_API_KEY;

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (typeof prompt !== "string" || !prompt.trim()) {
    return res
      .status(400)
      .json({ error: "Prompt must be a non-empty string." });
  }

  try {
    const response = await fetch(
      "https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${STABILITY_API_KEY}`,
        },
        body: JSON.stringify({
          text_prompts: [{ text: prompt }],
          cfg_scale: 7,
          height: 1024,
          width: 1024,
          steps: 35,
        }),
      }
    );

    if (!response.ok) {
      const err = await response.json();
      console.error("Eroare Stability:", err);
      return res.status(500).json({ error: "Image generation failed." });
    }

    const data = await response.json();
    const base64Image = data.artifacts[0].base64;

    res.json({ imageUrl: `data:image/png;base64,${base64Image}` });
  } catch (err) {
    console.error("Server error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
