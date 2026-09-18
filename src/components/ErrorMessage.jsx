import styles from './ErrorMessage.module.css'

function ErrorMessage({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className={styles.wrap} role="alert">
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retryBtn} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
