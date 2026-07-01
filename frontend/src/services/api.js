export async function analyzeReview(text) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review: text }),
  });

  return res.json();
}
