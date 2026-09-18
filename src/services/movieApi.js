// API adapter boundary for the teacher-provided movie backend.
//
// This is the ONLY file in the app that is allowed to know the backend's
// actual endpoint paths, HTTP methods, and response field names. Every
// other module consumes the stable frontend movie model documented in
// API-CONTRACT.md, never raw backend fields directly.
//
// STATUS: the backend contract has not been provided yet (see
// API-CONTRACT.md). These functions intentionally fail loudly instead of
// guessing at endpoint shapes, so the UI can render a real "not configured"
// state instead of pretending to be connected to a working backend.

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

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
  if (!API_BASE_URL) throw new ApiNotConfiguredError()

  // TODO: replace with the real details endpoint once the teacher's API
  // contract is known. Do not implement this against a guessed shape.
  throw new Error('getMovieDetails is not implemented: backend contract TBD.')
}
