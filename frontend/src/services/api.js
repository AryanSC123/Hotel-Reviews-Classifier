export async function analyzeReview(text) {
  const res = await fetch("http://127.0.0.1:5000/api/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ review: text }),
  });

  return res.json();
}
