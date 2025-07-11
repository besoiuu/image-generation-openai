import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/generate-image", async (req, res) => {
  console.log("🟢 BODY PRIMIT:", req.body);
  const { prompt } = req.body;

  // Protecție: prompt trebuie să fie string
  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({ error: "Prompt must be a non-empty string." });
  }

  try {
    const result = await openai.createImage({
      prompt,
      n: 1,
      size: "256x256",
    });

    res.json({ imageUrl: result.data.data[0].url });
  } catch (err) {
    console.error("OpenAI error:", err.response?.data || err.message);
    res.status(500).json({ error: "Image generation failed." });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

console.log("🔐 API KEY:", process.env.OPENAI_API_KEY);
