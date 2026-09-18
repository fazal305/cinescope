import { Link } from 'react-router-dom'
import ImageFallback from './ImageFallback.jsx'
import { formatRating } from '../utils/formatters.js'
import styles from './MovieCard.module.css'

function MovieCard({ movie }) {
  const rating = formatRating(movie.rating)

  return (
    <Link to={`/movies/${movie.id}`} className={styles.card}>
      <ImageFallback
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className={styles.poster}
      />
      <div className={styles.body}>
        <h3 className={styles.title}>{movie.title}</h3>
        <div className={styles.meta}>
          {movie.releaseYear && <span>{movie.releaseYear}</span>}
          {rating && <span className={styles.rating}>★ {rating}</span>}
        </div>
      </div>
    </Link>
  )
}

export default MovieCard
