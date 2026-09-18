// API adapter boundary for the teacher-provided movie backend.
//
// This is the ONLY file in the app that is allowed to know the backend's
// actual endpoint paths, HTTP methods, and response field names. Every
// other module consumes the stable frontend movie model documented in
// API-CONTRACT.md, never raw backend fields directly.
//
// STATUS: the backend contract has not been provided yet (see
// API-CONTRACT.md). By default these functions fail loudly instead of
// guessing at endpoint shapes, so the UI shows a real "not configured"
// state instead of pretending to be connected to a working backend.
//
// Setting VITE_USE_MOCK_API=true switches to a local, clearly-labeled mock
// (see mockMovieApi.js) so the UI can be built and demoed before the real
// contract exists. This is a temporary development aid, not a production
// data source — never rely on it once the teacher's API is available.

import * as mockMovieApi from './mockMovieApi.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true'

class ApiNotConfiguredError extends Error {
  constructor() {
    super(
      'VITE_API_BASE_URL is not set. The teacher backend API contract has ' +
        'not been configured yet — see API-CONTRACT.md.',
    )
    this.name = 'ApiNotConfiguredError'
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
  if (!API_BASE_URL) throw new ApiNotConfiguredError()

  // TODO: replace with the real search endpoint once the teacher's API
  // contract is known. Do not implement this against a guessed shape.
  throw new Error('searchMovies is not implemented: backend contract TBD.')
}

/**
 * Fetch full details for a single movie, normalized to the MovieDetails
 * frontend model (see API-CONTRACT.md).
 * @param {string} movieId
 * @param {{ signal?: AbortSignal }} [options]
 */
export async function getMovieDetails(movieId, options = {}) {
  if (USE_MOCK_API) return mockMovieApi.getMovieDetails(movieId, options)
  if (!API_BASE_URL) throw new ApiNotConfiguredError()

  // TODO: replace with the real details endpoint once the teacher's API
  // contract is known. Do not implement this against a guessed shape.
  throw new Error('getMovieDetails is not implemented: backend contract TBD.')
}
