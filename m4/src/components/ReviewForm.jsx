
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {useForm} from 'react-hook-form'
import * as api from '../utils/api'
import * as schemas from '../utils/schemas'
import { useMutation, useQueryClient } from "@tanstack/react-query";


export default function ReviewForm(){

    const {register, handleSubmit,  reset, formState: {errors, isSubmitting },} = useForm(
        {resolver: zodResolver(schemas.reviewListSchema), defaultValues:{
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

    const queryClient = useQueryClient();

    const mutacion = useMutation({
        mutationFn: api.submitReview,
        onSuccess: () => {
            reset(); //para que se vacíe el formulario después de mandarlo  
            // invalidamos la query para que se refresque la lista
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });

    function onSubmit(datos){
        mutacion.mutate({ ...datos, fecha: new Date().toISOString() });
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
                    {schemas.OBRAS.map((obra) => (
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
                            
            <button disabled={mutacion.isPending}>
                {mutacion.isPending ? "Enviando…" : "Enviar reseña"}
            </button>
            {mutacion.isError && <p role="alert" className="error">{mutacion.error.message}</p>}
            {mutacion.isSuccess && <p role="status">¡Reseña enviada!</p>}
        </form>
    )


}