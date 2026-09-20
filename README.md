# CineScope — Movie Search & Details

A cinematic movie search frontend: search for a film, browse results as a
responsive grid, and open a dedicated details page with synopsis, cast,
genres, runtime, and reviews.

This is a **frontend-only** project. It does not call OMDB, TMDB, or any
other public movie API — it consumes
[CineScope-REST-API](https://github.com/ChAbdulWahhab/CineScope-REST-API),
a Go + MongoDB backend built for this project, documented in
[API-CONTRACT.md](./API-CONTRACT.md).

**Live Demo:** https://fazal305.github.io/cinescope/

## Status

The backend is implemented and the frontend is fully wired to it
(`src/services/movieApi.js`, authenticated via `X-API-Key`). The public
GitHub Pages demo above currently runs with `VITE_USE_MOCK_API=true`
(visibly labeled "Demo mode" in the UI) since the backend isn't deployed
anywhere public yet — running it locally against the real API is fully
supported and verified. See [API-CONTRACT.md](./API-CONTRACT.md) for the
full contract.

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
CineScope-REST-API (Go + MongoDB)
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
                LoadingSpinner, NoResults, ImageFallback, MovieDetails, Header
  pages/        HomePage, MovieDetailsPage, NotFoundPage
  services/     movieApi.js (adapter boundary) + mock data/adapter for dev
  hooks/        useMovieSearch, useMovieDetails, useAutoFocus
  utils/        movieMappers.js (normalizer), formatters.js
  styles/       Design tokens (tokens.css) and global styles
public/
  favicon.svg, robots.txt, sitemap.xml
```

## API integration

See [API-CONTRACT.md](./API-CONTRACT.md) for the full contract: endpoints,
auth, error format, and field mapping. In short:

- `VITE_API_BASE_URL` + `VITE_API_KEY` unset → the adapter throws a clear
  "not configured" error; the UI shows a real error state instead of
  pretending to work.
- `VITE_USE_MOCK_API=true` → the adapter uses local mock data instead of
  the real API (useful when the backend isn't running locally).

## Environment variables

Copy `.env.example` to `.env`:

```
VITE_API_BASE_URL=http://localhost:8080
VITE_API_KEY=
VITE_USE_MOCK_API=false
```

Get the real `VITE_API_KEY` value from whoever is running the backend — it
must match the backend's own `API_KEY`. `.env` is git-ignored and must
never be committed.

## Installation

```bash
npm install
```

## Development

Run [CineScope-REST-API](https://github.com/ChAbdulWahhab/CineScope-REST-API)
locally first (see its own README), then:

```bash
npm run dev
```

To develop without the backend running, set `VITE_USE_MOCK_API=true` in
`.env` instead.

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

Deployed to GitHub Pages at https://fazal305.github.io/cinescope/ via the
GitHub Actions workflow in `.github/workflows/deploy.yml`, which runs on
every push to `main`: install → test → build → deploy.

Because GitHub Pages is static hosting with no server-side rewrites,
`public/404.html` implements the standard
[SPA-on-GitHub-Pages redirect](https://github.com/rafgraph/spa-github-pages)
so a direct load or refresh of `/movies/:id` resolves correctly instead of
404ing — verified live, not just in local dev.

Verified against the live URL specifically (not just `localhost`):

- ✅ No login gate / deployment protection blocking the public URL
- ✅ Client-side routes (`/movies/:id`) resolve correctly on direct load
- ✅ `robots.txt` and `sitemap.xml` reachable at the site root
- ✅ Unknown routes render the app's own 404 page, not GitHub's

Currently deployed with `VITE_USE_MOCK_API=true` (visibly labeled "Demo
mode" in the UI), since the backend isn't deployed anywhere public yet —
it only runs locally. Once it has a public URL, set `VITE_API_BASE_URL`
and `VITE_API_KEY` as repository variables/secrets, flip the workflow's
`VITE_USE_MOCK_API` to `false`, and confirm its CORS config allows
requests from this GitHub Pages origin.

## Known limitations

- The public GitHub Pages demo runs on mock data (clearly labeled) since
  the real backend only runs locally for now — running both together
  locally is fully verified and works end-to-end.
- Pagination and rate limits: none implemented server-side beyond the
  search endpoint's 50-result cap (see API-CONTRACT.md).
- The social preview image (`og:image`/`twitter:image`) is still missing —
  it needs to be a real screenshot of the deployed, populated app, and
  this environment has no way to save a rendered screenshot to disk as an
  image file. Capturing and adding one is the one open item from the
  original spec's SEO checklist.

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
