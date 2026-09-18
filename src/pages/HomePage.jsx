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
    retry,
    status,
    results,
    error,
    isSlow,
  } = useMovieSearch()

  const isBrowsing = !submittedQuery

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

      <div className={styles.results} aria-live="polite">
        <div key={`${status}-${submittedQuery}`} className="fade-in">
          {status === 'loading' && <LoadingSpinner isSlow={isSlow} />}
          {status === 'empty' && <NoResults query={submittedQuery || 'movies'} />}
          {status === 'error' && (
            <ErrorMessage
              title={error?.kind === 'offline' ? "You're offline" : 'Unable to load movies'}
              message={error?.message}
              onRetry={retry}
            />
          )}
          {status === 'success' && (
            <>
              <p className={styles.resultsCount}>
                {isBrowsing
                  ? `${results.length} ${results.length === 1 ? 'movie' : 'movies'}`
                  : `${results.length} ${results.length === 1 ? 'result' : 'results'} for "${submittedQuery}"`}
              </p>
              <MovieGrid movies={results} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomePage
