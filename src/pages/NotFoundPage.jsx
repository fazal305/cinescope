import { Link } from 'react-router-dom'
import { useAutoFocus } from '../hooks/useAutoFocus.js'
import styles from './NotFoundPage.module.css'

function NotFoundPage() {
  const focusRef = useAutoFocus()

  return (
    <section className={`container ${styles.wrap} fade-in`}>
      <p className={styles.code}>404</p>
      <h1 ref={focusRef} tabIndex={-1} data-route-heading className={styles.title}>
        Page not found
      </h1>
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
