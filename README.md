# CineScope — Movie Search & Details

A cinematic movie search frontend: search for a film, browse results as a
responsive grid, and open a dedicated details page with synopsis, cast,
genres, runtime, and reviews.

This is a **frontend-only** project. It does not call OMDB, TMDB, or any
other public movie API — it is built to consume a backend provided by a
teacher/instructor, whose contract is documented (and currently marked
`TBD`) in [API-CONTRACT.md](./API-CONTRACT.md).

**Live Demo:** not yet deployed — see [Deployment](#deployment).

## Status

The backend contract has not been provided yet. The app runs today against
a small, clearly-labeled local mock dataset (`VITE_USE_MOCK_API=true`) so
the UI could be built and demonstrated in the meantime. A visible "Demo
mode" badge appears in the UI whenever mock data is active — it is never
silently presented as a live integration. See
[API-CONTRACT.md](./API-CONTRACT.md) for exactly what's needed to connect
a real backend.

## Features

- Search movies by title, with results in a responsive grid
- Search query preserved in the URL (`?search=...`) — survives refresh and
  browser back/forward navigation
- Dedicated movie details page (`/movies/:id`) with poster, year, runtime,
  genres, rating, synopsis, cast, and reviews
- Missing backend fields degrade to an honest "not available" state or are
  omitted, rather than being invented
- Full set of real UI states: loading, slow-network notice, empty query,
  no results, backend error, offline, invalid movie ID, custom 404
- Request cancellation via `AbortController` — a new search cancels any
  in-flight one, so stale responses can't overwrite newer results
- Poster loading with a graceful fallback for missing or broken images
- Keyboard-accessible search and movie cards, visible focus states, focus
  moved to page content on client-side navigation
- Motion respects `prefers-reduced-motion`

## Tech stack

- React 19 + Vite (JavaScript, no TypeScript)
- react-router-dom
- Native `fetch` (no Axios)
- Plain CSS: CSS Modules + custom properties for design tokens
- Vitest for unit tests

No state-management library, no UI component library — none of it was
needed for an app this size.

## Architecture

```
Backend API (TBD)
      ↓
src/services/movieApi.js       ← the only file that knows backend field names
      ↓
src/utils/movieMappers.js      ← normalizes to the stable frontend model
      ↓
src/hooks/                     ← request state (loading/error/success), cancellation
      ↓
src/components/, src/pages/    ← render the frontend model only
```

Components never read a raw backend field. When the real contract arrives,
only `movieApi.js` and `movieMappers.js` need to change.

## Project structure

```
src/
  components/   Reusable UI: SearchBar, MovieCard, MovieGrid, ErrorMessage,
                LoadingSpinner, EmptyState, NoResults, ImageFallback,
                MovieDetails, Header
  pages/        HomePage, MovieDetailsPage, NotFoundPage
  services/     movieApi.js (adapter boundary) + mock data/adapter for dev
  hooks/        useMovieSearch, useMovieDetails, useAutoFocus
  utils/        movieMappers.js (normalizer), formatters.js
  styles/       Design tokens (tokens.css) and global styles
public/
  favicon.svg, robots.txt, sitemap.xml
```

## API integration

See [API-CONTRACT.md](./API-CONTRACT.md) for the full contract status,
field mapping, and what's still needed from the backend owner. In short:

- `VITE_API_BASE_URL` unset → the adapter throws a clear "not configured"
  error; the UI shows a real error state instead of pretending to work.
- `VITE_USE_MOCK_API=true` → the adapter uses local mock data for UI
  development only. Never enable this in production.

## Environment variables

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=
VITE_USE_MOCK_API=false
```

`.env` is git-ignored and must never be committed.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

To develop against mock data before a backend is available, set
`VITE_USE_MOCK_API=true` in `.env` first.

## Testing

```bash
npm test
```

Covers the response normalizer (`movieMappers.js`) and display formatters
(`formatters.js`) — the two pure-function layers most affected once a real
backend contract lands.

## Production build

```bash
npm run build
npm run preview   # serve the build locally to sanity-check it
```

## Deployment

Not yet deployed. Planned target: GitHub Pages, matching this repo's
existing hosting. Before this is marked live, the following will be
verified against the deployed URL specifically (not just `localhost`):

- CORS: the backend must allow requests from the production origin
- No login gate / deployment protection blocking the public URL
- Client-side routes (`/movies/:id`) resolve correctly, not just `/`
- `robots.txt` and `sitemap.xml` are reachable at the site root

## Known limitations

- No backend is connected yet — all data shown is mock/demo data,
  clearly labeled as such in the UI.
- Pagination, rate limits, authentication, and CORS behavior are all
  unknown until the real API contract is provided.
- The mock's field-mapping logic in `movieMappers.js` will need rewriting
  once real backend field names are known (by design — that's the one
  file meant to absorb that change).
- Canonical URL, `robots.txt`/`sitemap.xml` domain, and social preview
  image are placeholders pending deployment.

## Accessibility

Semantic HTML throughout (landmarks, real headings, real buttons/links —
no div click handlers), labeled form controls, visible focus states,
keyboard-accessible search and movie cards, focus moved to page content on
client-side route changes, `aria-live` regions for search status and form
validation, and motion that respects `prefers-reduced-motion`.

## Responsive design

Verified with no horizontal overflow at 375px, 390px, 768px, 1024px, and
1440px viewports, on both the search and details pages.

## Future improvements

Ideas flagged during development but intentionally out of scope unless
explicitly requested: search history, a favorites/watchlist using
localStorage, year/genre filters, a light theme toggle, PWA support.

## License

MIT — see [LICENSE](./LICENSE).
