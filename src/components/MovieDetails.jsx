import ImageFallback from './ImageFallback.jsx'
import { formatRating, formatRuntime } from '../utils/formatters.js'
import styles from './MovieDetails.module.css'

function MovieDetails({ movie }) {
  const rating = formatRating(movie.rating)
  const runtime = formatRuntime(movie.runtimeMinutes)
  const hasGenres = movie.genres && movie.genres.length > 0
  const hasCast = movie.cast && movie.cast.length > 0
  const hasReviews = movie.reviews && movie.reviews.length > 0

  return (
    <article>
      {movie.backdropUrl && (
        <div className={styles.backdrop}>
          <img src={movie.backdropUrl} alt="" />
        </div>
      )}

      <div className={styles.layout}>
        <ImageFallback
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className={styles.poster}
        />

        <div className={styles.info}>
          <h1 className={styles.title}>{movie.title}</h1>

          <div className={styles.badges}>
            {movie.releaseYear && <span className={styles.badge}>{movie.releaseYear}</span>}
            {runtime && <span className={styles.badge}>{runtime}</span>}
            {hasGenres &&
              movie.genres.map((genre) => (
                <span key={genre} className={styles.badge}>
                  {genre}
                </span>
              ))}
          </div>

          {rating ? (
            <p className={styles.rating}>★ {rating} / 10</p>
          ) : (
            <p className={styles.unavailable}>Rating not available.</p>
          )}

          <section aria-labelledby="synopsis-heading" className={styles.section}>
            <h2 id="synopsis-heading" className={styles.sectionTitle}>
              Synopsis
            </h2>
            {movie.synopsis ? (
              <p className={styles.synopsis}>{movie.synopsis}</p>
            ) : (
              <p className={styles.unavailable}>Synopsis not available.</p>
            )}
          </section>

          {hasCast && (
            <section aria-labelledby="cast-heading" className={styles.section}>
              <h2 id="cast-heading" className={styles.sectionTitle}>
                Cast
              </h2>
              <p className={styles.castList}>{movie.cast.join(', ')}</p>
            </section>
          )}

          {hasReviews && (
            <section aria-labelledby="reviews-heading" className={styles.section}>
              <h2 id="reviews-heading" className={styles.sectionTitle}>
                Reviews
              </h2>
              <ul className={styles.reviewList}>
                {movie.reviews.map((review, index) => (
                  <li key={index} className={styles.review}>
                    <p className={styles.reviewText}>&ldquo;{review.text}&rdquo;</p>
                    <p className={styles.reviewAuthor}>— {review.author}</p>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  )
}

export default MovieDetails
