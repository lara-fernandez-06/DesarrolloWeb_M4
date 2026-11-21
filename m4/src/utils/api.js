const API_URL = "http://localhost:3000";

export async function submitReview(data) {
  const resp = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error(`Error ${r.status}`);
  return resp.json();
}

export async function getReviews() {
  const resp = await fetch(`${API_URL}/reviews`);
  if (!resp.ok) throw new Error(`Error ${r.status}`);
  return resp.json();
}