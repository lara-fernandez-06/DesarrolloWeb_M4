export default function Review({reviewData}){

    return(
        <div className="review">
            <div className="review-header">
                <h4>{reviewData.obra}</h4>
                <span
                className="review-rating"
                role="img"
                aria-label={`${reviewData.rating} de 5 estrellas`}
                >
                {"★".repeat(reviewData.rating)}
                </span>
            </div>
            <h5>{reviewData.nombre} {reviewData.apellido}</h5>
            <p>{reviewData.review}</p>
        </div>
    )
}