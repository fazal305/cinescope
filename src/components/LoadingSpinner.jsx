import styles from './LoadingSpinner.module.css'

function LoadingSpinner({ isSlow }) {
  return (
    <div className={styles.wrap} role="status" aria-live="polite">
      <div className={styles.spinner} aria-hidden="true" />
      <p>{isSlow ? 'Still loading…' : 'Loading…'}</p>
    </div>
  )
}

export default LoadingSpinner
