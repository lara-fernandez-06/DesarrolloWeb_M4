import { z } from "zod";

export const OBRAS = ["Dear Evan Hansen", "Hamilton", "Heathers", "Six", "Hadestown", "West Side Story", "In the Heights"];

export const reviewForm = z.object({        
        nombre: z.string().min(2, "El nombre es demasiado corto"),
        apellido: z.string().min(2, "El apellido es demasiado corto"),
        email: z.email("Email no válido"),
        fechaNacimiento: z.coerce.date({error: "Fecha no válida" })
        .min(new Date("1900-01-01"), { error: "Fecha no válida" })
        .refine(
            (f) => {
            const hoy = new Date();
            return new Date(f.getFullYear() + 18, f.getMonth(), f.getDate()) <= hoy;
            },
            { error: "Debes ser mayor de edad" }
        ),
        obra: z.enum(OBRAS, {error: "Debes indicar la obra"}),
        rating: z.coerce
            .number({ error: "Selecciona una puntuación" })
            .min(1, "La puntuación mínima es 1 estrella")
            .max(5, "La puntuación máxima es 5 estrellas"),
        review: z.string().min(5, "Escribe al menos 5 caracteres").max(500, "Máximo 500 caracteres"),
        aceptaTerminos: z.literal(true, {error: "Debes aceptar los términos"})
    })


export const reviewResponseSchema = z.object({
  nombre: z.string().trim().min(2, "El nombre es demasiado corto"),
  apellido: z.string().trim().min(2, "El apellido es demasiado corto"),
  obra: z.enum(OBRAS),
  rating: z.number().int().min(1).max(5),
  review: z.string().trim().min(5, "Escribe al menos 5 caracteres").max(500, "Máximo 500 caracteres"),
  fecha: z.string(),
});

export const reviewListSchema = z.array(reviewResponseSchema);