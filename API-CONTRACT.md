# API Contract

This document records the actual contract of the backend CineScope talks to.
It is maintained as ground truth is confirmed — nothing here is guessed.

**Status: TBD — Teacher API Contract Required.**

Until the fields below are filled in, `src/services/movieApi.js` does not
call any backend; it throws a clear "not configured" error so the UI can
show a real, honest error state instead of pretending to work.

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
