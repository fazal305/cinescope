# API Contract

This document records the actual contract of the backend CineScope talks to.
It is maintained as ground truth is confirmed — nothing here is guessed.

**Status: TBD — Teacher API Contract Required.**

Until the fields below are filled in, `src/services/movieApi.js` does not
call any backend; it throws a clear "not configured" error so the UI can
show a real, honest error state instead of pretending to work.

## Interim: mock data for development

With `VITE_USE_MOCK_API=true` (see `.env.example`), `movieApi.js` instead
delegates to `src/services/mockMovieApi.js`, which searches a small local
dataset (`src/services/mockBackendData.js`) and simulates network latency.

This mock data is deliberately shaped with different field names than the
frontend model (`movie_id`, `movie_title`, `poster_path`, ...) so that
`src/utils/movieMappers.js` has a real normalization step to perform,
instead of being a pass-through. It exists purely so the UI could be built
and demoed before a backend existed — it is never used unless that flag is
explicitly set, and the app clearly labels itself "Demo mode" in the UI
whenever it's active. **None of the field names below are real** until this
document says otherwise.

## Base URL

TBD — Teacher API Contract Required

## Search movies

| | |
|---|---|
| Endpoint | TBD |
| Method | TBD |
| Query parameter(s) | TBD |
| Pagination | TBD |
| Rate limits | TBD |

Example request: TBD

Example response: TBD

## Movie details

| | |
|---|---|
| Endpoint | TBD |
| Method | TBD |
| Path parameter(s) | TBD |

Example request: TBD

Example response: TBD

## Field mapping

Once real responses are available, this table maps backend fields to the
frontend model used throughout the app (defined in `src/utils/movieMappers.js`).

| Frontend field | Backend field | Notes |
|---|---|---|
| `id` | TBD | |
| `title` | TBD | |
| `releaseYear` | TBD | |
| `posterUrl` | TBD | |
| `rating` | TBD | |
| `synopsis` | TBD | |
| `genres` | TBD | |
| `runtime` | TBD | |
| `cast` | TBD | |
| `reviews` | TBD | |

## Images

TBD — how poster/backdrop URLs are constructed (absolute vs. relative paths).

## Errors

TBD — shape of error responses (status codes, error body).

## Authentication

TBD — whether requests require an API key, token, or are open.

## CORS

TBD — confirm the backend allows requests from the local dev origin and the
deployed production origin.
