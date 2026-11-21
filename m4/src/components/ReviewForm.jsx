
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from 'react-hook-form'

const OBRAS = ["Dear Evan Hansen", "Hamilton", "Heathers", "Six", "Hadestown", "West Side Story", "In the Heights"]

const format = z.object({        
        nombre: z.string().min(2, "El nombre es demasiado corto"),
        apellido: z.string().min(2, "El apellido es demasiado corto"),
        email: z.email("Email no válido"),
        fechaNacimiento: z.coerce.date({error: "Fecha no válida" }).refine(
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

export default function ReviewForm(){

    const {register, handleSubmit,  formState: {errors, isSubmitting },} = useForm(
        {resolver: zodResolver(format), defaultValues:{
            nombre: "",
            apellido: "",
            email: "",
            fechaNacimiento: "",
            obra: "",
            rating: "",
            review:"",
            aceptaTerminos: false
            }}
    );

    function onSubmit(datos){
        console.log(datos)
    }

    return(
        <form className="reviewForm" onSubmit={handleSubmit(onSubmit)}>
            
            <label>
                Nombre
                <input type="text" autoComplete="given-name" placeholder="Ada" aria-invalid={!!errors.nombre} {...register("nombre")}></input>
            </label>
            {errors.nombre && <p className="error">{errors.nombre.message}</p>}

            <label>
                Apellidos
                <input type="text" autoComplete="family-name" placeholder="Lovelace" aria-invalid={!!errors.apellido} {...register("apellido")}></input>
            </label>
            {errors.apellido && <p className="error">{errors.apellido.message}</p>}

            <label>
                Email
                <input type="email" autoComplete="email" placeholder="ada.lovelace@gmail.com" aria-invalid={!!errors.email} {...register("email")}></input>
            </label>
            {errors.email && <p className="error">{errors.email.message}</p>}

            <label>
                Fecha de nacimiento
                <input type="date" autoComplete="bday" aria-invalid={!!errors.fechaNacimiento} {...register("fechaNacimiento")}></input>
            </label>
            {errors.fechaNacimiento && <p className="error">{errors.fechaNacimiento.message}</p>}

            <label>
                Título de la obra
                <select aria-invalid={!!errors.obra} {...register("obra")}>
                    <option value="">Selecciona una obra</option>
                    {OBRAS.map((obra) => (
                        <option key={obra} value={obra}>
                        {obra}
                        </option>
                    ))}
                </select>
            </label>
            {errors.obra && <p className="error">{errors.obra.message}</p>}

            <fieldset className="estrellas" aria-invalid={!!errors.rating} > {/*envolvemos las opciones radio en fielset*/}
                <legend>Puntuación</legend> {/*legend nos dice a que pregunta estamos respondiendo*/}
                {/*creamos las 5 opciones: las etiquetas están en cada una de ellas y nos dicen cual es*/}
                {[1, 2, 3, 4, 5].map((n) => ( 
                    <label key={n}>
                        <input type="radio" value={n} {...register("rating")} />
                        <span aria-hidden="true">★</span> {/*para la parte visual, eliges las estrellas pero el lector lo obvia*/}
                        <span className="sr-only">{n} {n === 1 ? "estrella" : "estrellas"}</span> {/*screen reader only: no se ve visualmente*/}
                    </label>
                ))}
            </fieldset>
            {errors.rating && <p className="error">{errors.rating.message}</p>}

            <label>
                Review
                <textarea placeholder="Escribe aquí tu reseña" aria-invalid={!!errors.review} {...register("review")}></textarea>
            </label>
            {errors.review && <p className="error">{errors.review.message}</p>}

            <label>
                <input type="checkbox" aria-invalid={!!errors.aceptaTerminos} {...register("aceptaTerminos")} />
                <span>He leído y aceptado los términos y condiciones</span>
            </label>
            {errors.aceptaTerminos && <p className="error">{errors.aceptaTerminos.message}</p>}
                            
            <button disabled={isSubmitting}>Enviar reseña</button>
        </form>
    )


}