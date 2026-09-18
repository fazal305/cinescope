// MOCK API — for local UI development only. See mockBackendData.js.
// Simulates network latency and honors AbortSignal so loading, slow-network,
// and cancellation behavior can be exercised before a real backend exists.

import { MOCK_MOVIES } from './mockBackendData.js'
import { toMovieDetails, toMovieSummary } from '../utils/movieMappers.js'

function delay(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })
}

export async function searchMovies(query, { signal } = {}) {
  await delay(500 + Math.random() * 400, signal)

  const normalizedQuery = query.trim().toLowerCase()
  const matches = MOCK_MOVIES.filter((movie) =>
    movie.movie_title.toLowerCase().includes(normalizedQuery),
  )

  return matches.map(toMovieSummary)
}

export async function getMovieDetails(movieId, { signal } = {}) {
  await delay(500 + Math.random() * 400, signal)

  const raw = MOCK_MOVIES.find((movie) => movie.movie_id === movieId)
  if (!raw) {
    throw new Error('Movie not found.')
  }

  return toMovieDetails(raw)
}
