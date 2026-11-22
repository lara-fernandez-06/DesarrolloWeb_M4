import { reviewListSchema } from "./schemas";
const API_URL = import.meta.env.VITE_API_URL;;

export async function submitReview(data) {
  const resp = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error(`Error ${resp.status}`);
  return resp.json();
}

export async function getReviews() {
  const resp = await fetch(`${API_URL}/reviews`);
  if (!resp.ok) throw new Error(`Error ${resp.status}`);

  //comprobamos que los datos no estén corruptos
  const result = reviewListSchema.safeParse(await resp.json());
  if (!result.success) {
    console.error("Respuesta del API inválida:", result.error.issues);
    throw new Error("El servidor devolvió datos con un formato inesperado");
  }

  return result.data;
}