// Normalizes raw backend responses into the stable frontend movie model.
//
// IMPORTANT: field paths match the Go API / mock backend shape
// (movie_id, movie_title, …). See API-CONTRACT.md. Components never read
// raw backend fields directly — change mappings only here.

/**
 * @typedef {{ id: string, title: string, releaseYear: number|null, posterUrl: string|null, rating: number|null }} MovieSummary
 */

/**
 * @typedef {MovieSummary & {
 *   backdropUrl: string|null,
 *   synopsis: string|null,
 *   genres: string[],
 *   runtimeMinutes: number|null,
 *   cast: string[],
 *   reviews: { author: string, text: string }[],
 * }} MovieDetails
 */

/** @returns {MovieSummary} */
export function toMovieSummary(raw) {
  return {
    id: String(raw.movie_id),
    title: raw.movie_title,
    releaseYear: raw.year ?? null,
    posterUrl: raw.poster_path ?? null,
    rating: raw.vote_average ?? null,
  }
}

/** @returns {MovieDetails} */
export function toMovieDetails(raw) {
  return {
    ...toMovieSummary(raw),
    backdropUrl: raw.backdrop_path ?? null,
    synopsis: raw.overview ?? null,
    genres: raw.genre_list ?? [],
    runtimeMinutes: raw.runtime_minutes ?? null,
    cast: raw.cast_list ?? [],
    reviews: raw.review_list ?? [],
  }
}
