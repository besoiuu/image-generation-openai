export const createImage = async (prompt) => {
  const res = await fetch("/.netlify/functions/generateImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Image generation failed.");
  }

  return data.image; // base64 string cu imaginea
};
