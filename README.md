# CineScope — Movie Search & Details

A cinematic movie search frontend built with React and Vite. Search for a
movie, browse results, and open a dedicated details page — powered by a
backend API.

**Status: foundation in progress.** This README will be filled out in full
(features, screenshots, deployment, live demo) once search and details are
wired up in later phases.

## Backend dependency

This is a frontend-only project. It depends entirely on a backend API for
movie data — it does not call OMDB, TMDB, or any other movie API. The
backend contract is not yet available; see [API-CONTRACT.md](./API-CONTRACT.md)
for its current (TBD) status and how backend fields map to the frontend's
movie model.

## Tech stack

- React + Vite (JavaScript, no TypeScript)
- react-router-dom
- Native `fetch`
- Plain CSS (CSS Modules + custom properties for design tokens)

## Project structure

```
src/
  components/   Reusable UI components
  pages/        Route-level pages (Home, MovieDetails, NotFound)
  services/     movieApi.js — the only file aware of backend field names
  hooks/        Data-fetching hooks (added once the API is wired up)
  utils/        Response normalization and formatting helpers
  styles/       Design tokens and global styles
```

## Environment variables

Copy `.env.example` to `.env` and set the backend base URL:

```
VITE_API_BASE_URL=
```

`.env` is git-ignored and must never be committed.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
