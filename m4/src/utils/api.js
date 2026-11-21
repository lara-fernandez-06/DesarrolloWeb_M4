const API_URL = "http://localhost:3000";

export async function submitReview(data) {
  const r = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!r.ok) throw new Error(`Error ${r.status}`);
  return r.json();
}