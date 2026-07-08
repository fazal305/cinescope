# MovieSearch — Nexsoft Movie Search App

A responsive movie search application built with HTML5, CSS3, JavaScript, Bootstrap, jQuery, and the OMDB API.

## Live Links

- GitHub Repository: https://github.com/fazal305/nexsoft-movie-search
- Live Demo: https://fazal305.github.io/nexsoft-movie-search/

## Overview

MovieSearch is a browser-based movie discovery app created for the Nexsoft Solutions Frontend Development Internship.

Users can search for movies, view posters, browse paginated results, open detailed movie information in a Bootstrap modal, and use genre shortcut buttons for quick discovery.

## Features

- Search movies by title
- Search using button click
- Search using Enter key
- Debounced live search
- Default movie search on page load
- Input validation
- Real movie data from OMDB API
- Movie posters
- Poster fallback placeholders
- Movie title and year display
- Full movie details modal
- IMDb rating display
- Visual rating bar
- Runtime, genre, director, actors, awards, language, country, and box office details
- IMDb profile link
- Dynamic pagination
- First, previous, next, and last page buttons
- Result count display
- Skeleton loading cards
- Empty state
- Error state
- Retry button
- Back-to-top button
- Responsive dark neon UI

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Bootstrap 5
- jQuery 3.7.1
- OMDB API
- GitHub Pages
  Folder Structure
  nexsoft-movie-search/
  index.html
  styles.css
  script.js
  README.md
  LICENSE
  .gitignore
  Getting Started

Clone the repository:

git clone https://github.com/fazal305/nexsoft-movie-search.git

Open the folder:

cd nexsoft-movie-search

Open index.html in your browser.

No build tools or installation required.

OMDB API Setup

This project uses the OMDB API.

API base URL:

https://www.omdbapi.com/

The API key is stored in script.js for internship demo purposes:

const API_KEY = "YOUR_API_KEY";

For production-level projects, API keys should be handled through a backend or protected environment setup because frontend API keys are visible in browser source code.

Architecture Notes

The project is split into three main files:

index.html contains the page structure, search form, result sections, pagination area, modal, and footer.
styles.css handles the dark neon layout, responsive grid, cards, skeleton loading, modal styling, and buttons.
script.js handles OMDB API requests, search validation, live search debounce, pagination, movie cards, movie details modal, poster fallback, error state, and back-to-top behavior.

The updated JavaScript escapes API text before inserting it into HTML templates to make rendering safer.

Accessibility

Accessibility support includes:

Semantic header, main, section, nav, and footer
Search input label for screen readers
aria-live validation and result count messages
Button type="button" attributes
aria-current on active filter and pagination buttons
Descriptive poster alt text
Keyboard-friendly Bootstrap modal
Back-to-top button with accessible label
Performance

Performance notes:

Static frontend project
No build process
Lazy-loaded poster images
Skeleton loading for better perceived performance
Lightweight JavaScript
GitHub Pages compatible
Testing Checklist

Before final submission:

Search for a valid movie
Search using Enter key
Test live search
Search with fewer than 2 characters
Search for a movie with no poster
Open movie details modal
Test IMDb link
Test pagination buttons
Test genre shortcut buttons
Test retry button by simulating API error
Test mobile responsiveness
Run JavaScript syntax check:
node --check script.js
Lessons Learned
Fetching real API data with JavaScript
Working with OMDB search and detail endpoints
Building dynamic pagination
Creating Bootstrap modals with API data
Handling loading, empty, and error states
Improving safe dynamic HTML rendering
Preparing an API-based frontend project for portfolio use
Future Improvements
Add search history
Add favorites with localStorage
Add year filter
Add movie type filter
Add watchlist page
Add light/dark theme toggle
Move API key handling to backend proxy
Add PWA support
