import fetch from "node-fetch";

export async function handler(event, context) {
  console.log("🔁 Function hit");

  const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
  const body = JSON.parse(event.body || "{}");
  const prompt = body.prompt;

  if (!prompt || typeof prompt !== "string" || prompt.trim() === "") {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Prompt must be a non-empty string." }),
    };
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
      const errData = await response.json();
      console.error("❌ Stability error:", errData);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errData.message || "Stability failed." }),
      };
    }

    const result = await response.json();
    const base64Image = result.artifacts?.[0]?.base64;

    return {
      statusCode: 200,
      body: JSON.stringify({
        image: `data:image/png;base64,${base64Image}`,
      }),
    };
  } catch (err) {
    console.error("❗ Unexpected error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || "Server error" }),
    };
  }
}