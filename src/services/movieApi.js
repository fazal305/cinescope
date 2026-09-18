// API adapter for the CineScope Go + MongoDB backend.
//
// This is the ONLY file in the app that is allowed to know the backend's
// endpoint paths, HTTP methods, and response field names. Every other module
// consumes the stable frontend movie model — see API-CONTRACT.md.

import * as mockMovieApi from './mockMovieApi.js'
import { toMovieDetails, toMovieSummary } from '../utils/movieMappers.js'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')
const API_KEY = import.meta.env.VITE_API_KEY || ''
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

class ApiNotConfiguredError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ApiNotConfiguredError'
  }
}

async function apiFetch(path, { signal } = {}) {
  let response
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'X-API-Key': API_KEY,
      },
      signal,
    })
  } catch (err) {
    if (err?.name === 'AbortError') throw err
    throw new Error('Network error — is the API running?')
  }

  if (response.ok) {
    return response.json()
  }

  let message = `Request failed (${response.status})`
  try {
    const body = await response.json()
    if (body?.message) message = body.message
  } catch {
    // ignore non-JSON error bodies
  }
  throw new Error(message)
}

function assertConfigured() {
  if (!API_BASE_URL) {
    throw new ApiNotConfiguredError(
      'VITE_API_BASE_URL is not set. Configure the Go API base URL — see API-CONTRACT.md.',
    )
  }
  if (!API_KEY) {
    throw new ApiNotConfiguredError(
      'VITE_API_KEY is not set. The API requires an X-API-Key header — see API-CONTRACT.md.',
    )
  }
}

/**
 * Search movies by title. Resolves to an array of normalized MovieSummary
 * objects (see API-CONTRACT.md for the target frontend model).
 * @param {string} query
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function searchMovies(query, options = {}) {
  if (USE_MOCK_API) return mockMovieApi.searchMovies(query, options)
  assertConfigured()

  const params = new URLSearchParams({ search: query ?? '' })
  const raw = await apiFetch(`/api/v1/movies?${params}`, options)
  if (!Array.isArray(raw)) {
    throw new Error('Unexpected search response from API.')
  }
  return raw.map(toMovieSummary)
}

/**
 * Fetch full details for a single movie, normalized to the MovieDetails
 * frontend model (see API-CONTRACT.md).
 * @param {string} movieId
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function getMovieDetails(movieId, options = {}) {
  if (USE_MOCK_API) return mockMovieApi.getMovieDetails(movieId, options)
  assertConfigured()

  const raw = await apiFetch(`/api/v1/movies/${encodeURIComponent(movieId)}`, options)
  return toMovieDetails(raw)
}
