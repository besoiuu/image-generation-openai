export const createImage = async (prompt) => {
  const res = await fetch("http://localhost:5000/generate-image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();

  if (!res.ok) {
    console.error("Eroare server:", data);
    throw new Error(data.error || "A apărut o eroare.");
  }

  return data.imageUrl; // este data:image/png;base64,...
};