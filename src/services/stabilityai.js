export const createImage = async (prompt) => {
  try {
    const res = await fetch("/.netlify/functions/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("❌ Eroare server:", data);
      throw new Error(data.error || "A apărut o eroare la generarea imaginii.");
    }

    return data.image;
  } catch (err) {
    console.error("⚠️ Eroare rețea sau runtime:", err.message);
    throw new Error(
      "Imaginea nu a putut fi generată. Verifică conexiunea sau încearcă din nou mai târziu."
    );
  }
};
