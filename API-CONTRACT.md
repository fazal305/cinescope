# API Contract

Ground truth for the CineScope Go + MongoDB backend (`../cinescope-api`).

**Status: Implemented.**

## Base URL

Local default: `http://localhost:8080`

Set in the frontend via `VITE_API_BASE_URL` (no trailing slash).

## Authentication

All `/api/*` routes require an API key.

| Header | Value |
|--------|--------|
| `X-API-Key` | Same secret as server `API_KEY` |

Also accepted: `Authorization: Bearer <API_KEY>`.

Frontend: set `VITE_API_KEY` (sent automatically by `movieApi.js`).

Missing/invalid key → `401`:

```json
{ "error": "missing_api_key", "message": "API key is required. Send X-API-Key header." }
```

or

```json
{ "error": "invalid_api_key", "message": "Invalid API key." }
```

`/healthz` and `/readyz` are public (no key).

## Search movies

| | |
|---|---|
| Endpoint | `/api/v1/movies` |
| Method | `GET` |
| Auth | `X-API-Key` required |
| Query parameter(s) | `search` (alias `q`) |
| Pagination | None (server caps at 50) |

Example:

```http
GET /api/v1/movies?search=inception
X-API-Key: <your-api-key>
```

## Movie details

| | |
|---|---|
| Endpoint | `/api/v1/movies/{id}` |
| Method | `GET` |
| Auth | `X-API-Key` required |
| Path parameter(s) | `id` — TMDB-style `movie_id` string |

Example:

```http
GET /api/v1/movies/27205
X-API-Key: <your-api-key>
```

## Field mapping

| Frontend field | Backend field | Notes |
|---|---|---|
| `id` | `movie_id` | TMDB id as string |
| `title` | `movie_title` | |
| `releaseYear` | `year` | |
| `posterUrl` | `poster_path` | Absolute TMDB CDN URL |
| `rating` | `vote_average` | 0–10 |
| `backdropUrl` | `backdrop_path` | Absolute TMDB CDN URL |
| `synopsis` | `overview` | |
| `genres` | `genre_list` | `string[]` |
| `runtimeMinutes` | `runtime_minutes` | |
| `cast` | `cast_list` | |
| `reviews` | `review_list` | `{ author, text }[]` |

## Images

Poster/backdrop are absolute `image.tmdb.org` URLs. Client uses them as-is.

## Errors

| Status | `error` | When |
|--------|---------|------|
| `401` | `missing_api_key` / `invalid_api_key` | Auth failure |
| `404` | `not_found` | Unknown movie id |
| `400` | `bad_request` | Missing id |
| `500` | `internal_error` | Server/DB failure |
| `503` | `not_ready` | `/readyz` when MongoDB is down |

## CORS

Allowed origins via `CORS_ORIGINS`. Allowed headers include `X-API-Key` and `Authorization`.
