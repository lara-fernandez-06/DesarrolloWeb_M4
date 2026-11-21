import { z } from "zod";

export const OBRAS = ["Dear Evan Hansen", "Hamilton", "Heathers", "Six", "Hadestown", "West Side Story", "In the Heights"];

export const reviewResponseSchema = z.object({
  id: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  obra: z.enum(OBRAS),
  rating: z.number().int().min(1).max(5),
  review: z.string(),
  fecha: z.string(),
});

export const reviewListSchema = z.array(reviewResponseSchema);