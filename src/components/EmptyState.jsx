import styles from './StatusMessage.module.css'

function EmptyState() {
  return (
    <div className={styles.wrap}>
      <span className={styles.icon} aria-hidden="true">
        🔍
      </span>
      <p className={styles.text}>Search for a movie to get started.</p>
    </div>
  )
}

export default EmptyState
