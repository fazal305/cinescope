import { Link, useParams } from 'react-router-dom'
import styles from './MovieDetailsPage.module.css'

function MovieDetailsPage() {
  const { id } = useParams()

  return (
    <section className={`container ${styles.wrap}`}>
      <Link to="/" className={styles.back}>
        ← Back to search
      </Link>
      <h1 className={styles.title}>Movie details</h1>
      <p className={styles.note}>
        Details for movie ID <code>{id}</code> will load here once the
        backend API contract is available.
      </p>
    </section>
  )
}

export default MovieDetailsPage
