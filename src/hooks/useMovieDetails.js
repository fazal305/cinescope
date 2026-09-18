import { useCallback, useEffect, useState } from 'react'
import { getMovieDetails } from '../services/movieApi.js'

const SLOW_NETWORK_DELAY_MS = 4000

export function useMovieDetails(movieId) {
  const [status, setStatus] = useState('loading') // loading | success | error
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(null)
  const [isSlow, setIsSlow] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    if (!movieId) {
      setStatus('error')
      setError({ message: 'Invalid movie ID.' })
      return
    }

    const controller = new AbortController()
    setStatus('loading')
    setError(null)
    setIsSlow(false)

    const slowTimer = setTimeout(() => setIsSlow(true), SLOW_NETWORK_DELAY_MS)

    getMovieDetails(movieId, { signal: controller.signal })
      .then((data) => {
        setMovie(data)
        setStatus('success')
      })
      .catch((err) => {
        if (err.name === 'AbortError') return
        setStatus('error')
        setError({ message: err.message || 'Unable to load movie details.' })
      })
      .finally(() => {
        clearTimeout(slowTimer)
        setIsSlow(false)
      })

    return () => {
      clearTimeout(slowTimer)
      controller.abort()
    }
  }, [movieId, retryCount])

  const retry = useCallback(() => setRetryCount((count) => count + 1), [])

  return { status, movie, error, isSlow, retry }
}
