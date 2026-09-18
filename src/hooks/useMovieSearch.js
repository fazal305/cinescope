import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../services/movieApi.js'

const SLOW_NETWORK_DELAY_MS = 4000

// Loads the full catalog when there is no search query; filters when ?search= is set.
export function useMovieSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const submittedQuery = searchParams.get('search') ?? ''

  const [inputValue, setInputValue] = useState(submittedQuery)
  const [status, setStatus] = useState('loading') // loading | success | empty | error
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [isSlow, setIsSlow] = useState(false)
  const [reloadToken, setReloadToken] = useState(0)

  const abortRef = useRef(null)

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.onLine === false) {
      setStatus('error')
      setError({ kind: 'offline', message: "You're offline — check your connection and try again." })
      return
    }

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus('loading')
    setError(null)
    setIsSlow(false)

    const slowTimer = setTimeout(() => setIsSlow(true), SLOW_NETWORK_DELAY_MS)

    // Empty query → API returns the full movie list (browse).
    searchMovies(submittedQuery, { signal: controller.signal })
      .then((movies) => {
        setResults(movies)
        setStatus(movies.length === 0 ? 'empty' : 'success')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setStatus('error')
        setError({ kind: 'backend', message: err.message || 'Unable to load movies.' })
      })
      .finally(() => {
        clearTimeout(slowTimer)
        setIsSlow(false)
      })

    return () => {
      clearTimeout(slowTimer)
      controller.abort()
    }
  }, [submittedQuery, reloadToken])

  const submit = useCallback(
    (rawQuery) => {
      const trimmed = rawQuery.trim()
      setInputValue(trimmed)
      if (!trimmed) {
        setSearchParams({}, { replace: true })
        setReloadToken((n) => n + 1)
        return
      }
      setSearchParams({ search: trimmed })
    },
    [setSearchParams],
  )

  const clear = useCallback(() => {
    setInputValue('')
    setSearchParams({}, { replace: true })
  }, [setSearchParams])

  const retry = useCallback(() => {
    setReloadToken((n) => n + 1)
  }, [])

  return {
    inputValue,
    setInputValue,
    submittedQuery,
    submit,
    clear,
    retry,
    status,
    results,
    error,
    isSlow,
  }
}
