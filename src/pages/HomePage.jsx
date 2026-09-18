import EmptyState from '../components/EmptyState.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import LoadingSpinner from '../components/LoadingSpinner.jsx'
import MovieGrid from '../components/MovieGrid.jsx'
import NoResults from '../components/NoResults.jsx'
import SearchBar from '../components/SearchBar.jsx'
import { useMovieSearch } from '../hooks/useMovieSearch.js'
import styles from './HomePage.module.css'

const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

function HomePage() {
  const {
    inputValue,
    submittedQuery,
    submit,
    clear,
    status,
    results,
    error,
    isSlow,
  } = useMovieSearch()

  function handleRetry() {
    submit(submittedQuery)
  }

  return (
    <section className={`container ${styles.wrap}`}>
      <div className={styles.hero}>
        <p className={styles.eyebrow}>Movie Search</p>
        <h1 className={styles.title}>Find the film you're thinking of.</h1>
        {USE_MOCK_API && (
          <p className={styles.demoBadge}>
            Demo mode — showing mock data, not a live backend.
          </p>
        )}
        <SearchBar initialValue={inputValue} onSubmit={submit} onClear={clear} disabled={status === 'loading'} />
      </div>

      <div className={styles.results}>
        {status === 'idle' && <EmptyState />}
        {status === 'loading' && <LoadingSpinner isSlow={isSlow} />}
        {status === 'empty' && <NoResults query={submittedQuery} />}
        {status === 'error' && (
          <ErrorMessage
            title={error?.kind === 'offline' ? "You're offline" : 'Unable to load movies'}
            message={error?.message}
            onRetry={handleRetry}
          />
        )}
        {status === 'success' && <MovieGrid movies={results} />}
      </div>
    </section>
  )
}

export default HomePage
