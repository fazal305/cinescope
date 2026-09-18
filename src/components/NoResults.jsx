import styles from './StatusMessage.module.css'

function NoResults({ query }) {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon} aria-hidden="true">
        🎬
      </span>
      <p className={styles.text}>No movies found for "{query}".</p>
    </div>
  )
}

export default NoResults
