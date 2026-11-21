import * as api from '../utils/api'
import { useQuery } from "@tanstack/react-query";
import Review from './Review'

export default function ReviewContainer(){

    const {data, isPending, isError, error} = useQuery({
        queryKey:["reviews"],
        queryFn: api.getReviews
    })

    if(isPending) return <p>Cargando...</p>
    if(isError) return <p>Error: {error.message}</p>

    return(
        <div className='review-container'>
            <h3>Mira las últimas reseñas:</h3>
            {/*Se ven las 5 reseñas más recientes*/}
            {data.toSorted((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5).map((review)=><Review key={review.id} reviewData={review}/>)}
        </div>
        
    )

}