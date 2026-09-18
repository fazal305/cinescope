import { Link } from 'react-router-dom'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  return (
    <section className={`container ${styles.wrap}`}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.note}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={styles.link}>
        Back to movie search
      </Link>
    </section>
  )
}

export default NotFoundPage
