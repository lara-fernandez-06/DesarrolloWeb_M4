export default function Review({reviewData}){

    return(
        <div className="review">
            <h4>{reviewData.obra}</h4>
            <h5>{reviewData.nombre} {reviewData.apellido}</h5>
            <p>{reviewData.review}</p>
        </div>
    )
}