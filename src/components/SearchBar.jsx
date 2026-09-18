import { useEffect, useState } from 'react'
import styles from './SearchBar.module.css'

function SearchBar({ initialValue, onSubmit, onClear, disabled }) {
  const [value, setValue] = useState(initialValue)
  const [validationMessage, setValidationMessage] = useState('')

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  function handleSubmit(event) {
    event.preventDefault()
    if (!value.trim()) {
      setValidationMessage('Enter a movie title to search.')
      return
    }
    setValidationMessage('')
    onSubmit(value)
  }

  function handleClear() {
    setValue('')
    setValidationMessage('')
    onClear()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <label htmlFor="movie-search-input" className="visually-hidden">
        Search movie title
      </label>
      <div className={styles.controls}>
        <input
          id="movie-search-input"
          type="text"
          className={styles.input}
          placeholder="Search for a movie…"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            className={styles.clearBtn}
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
        <button type="submit" className={styles.submitBtn} disabled={disabled}>
          Search
        </button>
      </div>
      <p className={styles.validation} aria-live="polite">
        {validationMessage}
      </p>
    </form>
  )
}

export default SearchBar
