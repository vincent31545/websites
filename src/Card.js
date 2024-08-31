import './Card.css'

function Card({title, score}) {
    const scoreClass = `score${score}`;

    return (
        <div className={`card-container ${scoreClass}`}>
            <div className="verse-title">
                {title}
            </div>
        </div>
    )
}

export default Card;