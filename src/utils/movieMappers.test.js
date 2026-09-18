import { describe, expect, it } from 'vitest'
import { toMovieDetails, toMovieSummary } from './movieMappers.js'

const fullRaw = {
  movie_id: 1,
  movie_title: 'Inception',
  year: 2010,
  poster_path: '/posters/1.jpg',
  vote_average: 8.4,
  backdrop_path: '/backdrops/1.jpg',
  overview: 'A thief who steals corporate secrets.',
  genre_list: ['Sci-Fi', 'Thriller'],
  runtime_minutes: 148,
  cast_list: ['Leonardo DiCaprio'],
  review_list: [{ author: 'demo', text: 'Great film.' }],
}

describe('toMovieSummary', () => {
  it('maps a full raw record to the frontend model', () => {
    expect(toMovieSummary(fullRaw)).toEqual({
      id: '1',
      title: 'Inception',
      releaseYear: 2010,
      posterUrl: '/posters/1.jpg',
      rating: 8.4,
    })
  })

  it('always returns a string id, even from a numeric backend id', () => {
    expect(toMovieSummary(fullRaw).id).toBe('1')
  })

  it('falls back to null for missing optional fields', () => {
    const summary = toMovieSummary({ movie_id: '2', movie_title: 'Untitled' })
    expect(summary.releaseYear).toBeNull()
    expect(summary.posterUrl).toBeNull()
    expect(summary.rating).toBeNull()
  })
})

describe('toMovieDetails', () => {
  it('extends the summary with detail fields', () => {
    const details = toMovieDetails(fullRaw)
    expect(details).toMatchObject({
      id: '1',
      title: 'Inception',
      synopsis: 'A thief who steals corporate secrets.',
      genres: ['Sci-Fi', 'Thriller'],
      runtimeMinutes: 148,
      cast: ['Leonardo DiCaprio'],
      reviews: [{ author: 'demo', text: 'Great film.' }],
    })
  })

  it('falls back to empty arrays and null, never undefined, for missing detail fields', () => {
    const details = toMovieDetails({ movie_id: '3', movie_title: 'Untitled' })
    expect(details.synopsis).toBeNull()
    expect(details.backdropUrl).toBeNull()
    expect(details.runtimeMinutes).toBeNull()
    expect(details.genres).toEqual([])
    expect(details.cast).toEqual([])
    expect(details.reviews).toEqual([])
  })
})
