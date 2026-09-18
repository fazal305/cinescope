import { Link, useParams } from 'react-router-dom'
import ErrorMessage from '../components/ErrorMessage.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import MovieDetails from '../components/MovieDetails.jsx'
import { useAutoFocus } from '../hooks/useAutoFocus.js'
import { useMovieDetails } from '../hooks/useMovieDetails.js'
import styles from './MovieDetailsPage.module.css'

function MovieDetailsPage() {
  const { id } = useParams()
  const { status, movie, error, isSlow, retry } = useMovieDetails(id)
  const focusRef = useAutoFocus(status, id)

  return (
    <section className={`container ${styles.wrap}`}>
      <Link to="/" className={styles.back}>
        ← Back to search
      </Link>

      <div ref={focusRef} tabIndex={-1} data-route-heading className="fade-in">
        {status === 'loading' && <LoadingSpinner isSlow={isSlow} />}

        {status === 'error' && (
          <ErrorMessage
            title={error?.message === 'Movie not found.' ? 'Movie not found' : 'Unable to load movie details'}
            message={
              error?.message === 'Movie not found.'
                ? "We couldn't find a movie with that ID."
                : error?.message
            }
            onRetry={error?.message === 'Movie not found.' ? undefined : retry}
          />
        )}

        {status === 'success' && movie && <MovieDetails movie={movie} />}
      </div>
    </section>
  )
}

export default MovieDetailsPage
