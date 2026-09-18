import { useCallback, useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchMovies } from '../services/movieApi.js'

const SLOW_NETWORK_DELAY_MS = 4000

// Search is submit-based rather than live/debounced: the backend's rate
// limits and pagination behavior are unknown (see API-CONTRACT.md), so we
// avoid firing a request on every keystroke until that's confirmed.
export function useMovieSearch() {
  const [searchParams, setSearchParams] = useSearchParams()
  const submittedQuery = searchParams.get('search') ?? ''

  const [inputValue, setInputValue] = useState(submittedQuery)
  const [status, setStatus] = useState('idle') // idle | loading | success | empty | error
  const [results, setResults] = useState([])
  const [error, setError] = useState(null)
  const [isSlow, setIsSlow] = useState(false)

  const abortRef = useRef(null)

  useEffect(() => {
    if (!submittedQuery) {
      setStatus('idle')
      setResults([])
      return
    }

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
  }, [submittedQuery])

  const submit = useCallback(
    (rawQuery) => {
      const trimmed = rawQuery.trim()
      setInputValue(trimmed)
      if (!trimmed) {
        setSearchParams({}, { replace: true })
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

  return {
    inputValue,
    setInputValue,
    submittedQuery,
    submit,
    clear,
    status,
    results,
    error,
    isSlow,
  }
}
