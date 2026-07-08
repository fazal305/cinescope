const API_KEY = "debf653a";
const API_BASE = "https://www.omdbapi.com/";
const RESULTS_PER_PAGE = 10;
const DEFAULT_QUERY = "batman";

const appState = {
  currentQuery: "",
  currentPage: 1,
  totalResults: 0,
  totalPages: 0,
  isLoading: false
};

function escapeHtml(value) {
  return String(value || "N/A")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

async function searchMovies(query, page = 1) {
  if (appState.isLoading) return;

  appState.isLoading = true;
  appState.currentQuery = query;
  appState.currentPage = page;

  showLoading();

  try {
    const searchUrl = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&type=movie&page=${page}`;
    const response = await fetch(searchUrl);
    const data = await response.json();

    if (data.Response === "False") {
      appState.totalResults = 0;
      appState.totalPages = 0;
      showEmptyState(query);
      return;
    }

    appState.totalResults = Number(data.totalResults);
    appState.totalPages = Math.ceil(appState.totalResults / RESULTS_PER_PAGE);

    renderMovies(data.Search || []);
    renderPagination(appState.totalResults, appState.currentPage);

    const startResult = (page - 1) * RESULTS_PER_PAGE + 1;
    const endResult = Math.min(page * RESULTS_PER_PAGE, appState.totalResults);

    $("#results-title").text(`Showing results for "${query}"`);
    $("#results-count").text(`Showing results ${startResult}-${endResult} of ${appState.totalResults}`);
    $("#clear-search-btn").removeClass("d-none");
  } catch {
    showError("Unable to reach OMDB API. Please verify your API key, internet connection, or daily request limit.");
  } finally {
    appState.isLoading = false;
  }
}

async function fetchMovieDetail(imdbId) {
  const detailUrl = `${API_BASE}?apikey=${API_KEY}&i=${encodeURIComponent(imdbId)}&plot=full`;
  const response = await fetch(detailUrl);
  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Movie details not found.");
  }

  return data;
}

function renderMovies(movies) {
  const moviesGrid = $("#movies-grid");
  moviesGrid.empty();

  movies.forEach(function (movie) {
    moviesGrid.append(buildMovieCard(movie));
  });

  $("#status-area").empty();
}

function buildMovieCard(movie) {
  const safeTitle = escapeHtml(movie.Title);
  const safeYear = escapeHtml(movie.Year);
  const safePoster = escapeHtml(movie.Poster);
  const safeImdbId = escapeHtml(movie.imdbID);

  const posterHtml = movie.Poster !== "N/A"
    ? `<img src="${safePoster}" alt="${safeTitle} poster" class="movie-poster" loading="lazy" onerror="handlePosterError(this)" />`
    : buildPosterPlaceholder(safeTitle);

  return `
    <article class="movie-card">
      ${posterHtml}
      <div class="movie-card-body">
        <h3 class="movie-title">${safeTitle}</h3>
        <p class="movie-year">${safeYear}</p>
        <button class="view-detail-btn" type="button" data-imdb-id="${safeImdbId}">
          View Details
        </button>
      </div>
    </article>
  `;
}

function buildPosterPlaceholder(title) {
  return `
    <div class="poster-placeholder">
      <div>
        <span aria-hidden="true">🎬</span>
        <p>${title}</p>
      </div>
    </div>
  `;
}

async function showMovieDetail(imdbId) {
  $("#movie-modal-title").text("Loading Movie...");
  $("#movie-modal-body").html(`
    <div class="modal-loading">
      <div class="spinner-border text-info" role="status"></div>
      <p>Fetching full movie details...</p>
    </div>
  `);

  $("#movie-modal").modal("show");

  try {
    const movie = await fetchMovieDetail(imdbId);
    renderModal(movie);
  } catch (error) {
    $("#movie-modal-title").text("Unable to load details");
    $("#movie-modal-body").html(`
      <section class="error-state">
        <div>
          <span aria-hidden="true">⚠️</span>
          <h3>Details Error</h3>
          <p>${escapeHtml(error.message)}</p>
        </div>
      </section>
    `);
  }
}

function renderModal(movie) {
  const safeTitle = escapeHtml(movie.Title);
  const safePoster = escapeHtml(movie.Poster);
  const safeImdbId = escapeHtml(movie.imdbID);

  const posterHtml = movie.Poster !== "N/A"
    ? `<img src="${safePoster}" alt="${safeTitle} poster" class="modal-poster" loading="lazy" />`
    : `
      <div class="modal-poster-placeholder">
        <div>
          <span aria-hidden="true">🎬</span>
          <p>No poster available</p>
        </div>
      </div>
    `;

  $("#movie-modal-title").text(movie.Title);

  $("#movie-modal-body").html(`
    <section class="modal-movie-layout">
      <div>${posterHtml}</div>

      <div class="modal-info">
        <h3>${safeTitle}</h3>

        <div class="detail-meta">
          <span class="detail-badge">${escapeHtml(movie.Year)}</span>
          <span class="detail-badge">${escapeHtml(movie.Rated)}</span>
          <span class="detail-badge">${escapeHtml(movie.Runtime)}</span>
          <span class="detail-badge">${escapeHtml(movie.Genre)}</span>
        </div>

        ${buildRatingBar(movie.imdbRating)}

        <p class="plot-text">${escapeHtml(movie.Plot)}</p>

        <div class="detail-list">
          <p><strong>Director:</strong> ${escapeHtml(movie.Director)}</p>
          <p><strong>Actors:</strong> ${escapeHtml(movie.Actors)}</p>
          <p><strong>Awards:</strong> ${escapeHtml(movie.Awards)}</p>
          <p><strong>Language:</strong> ${escapeHtml(movie.Language)}</p>
          <p><strong>Country:</strong> ${escapeHtml(movie.Country)}</p>
          <p><strong>Box Office:</strong> ${escapeHtml(movie.BoxOffice)}</p>
        </div>

        <a href="https://www.imdb.com/title/${safeImdbId}" target="_blank" rel="noopener noreferrer" class="imdb-link-btn">
          🎥 View on IMDb
        </a>
      </div>
    </section>
  `);
}

function buildRatingBar(rating) {
  const ratingText = rating || "N/A";
  const ratingNumber = ratingText === "N/A" ? 0 : Number(ratingText);
  const ratingPercentage = Number.isFinite(ratingNumber) ? Math.min(ratingNumber * 10, 100) : 0;

  return `
    <div class="rating-block">
      <p class="rating-text">⭐ IMDb Rating: ${escapeHtml(ratingText)}/10</p>
      <div class="rating-track" aria-hidden="true">
        <div class="rating-fill" style="width: ${ratingPercentage}%"></div>
      </div>
    </div>
  `;
}

function renderPagination(totalResults, currentPage) {
  const totalPages = Math.ceil(totalResults / RESULTS_PER_PAGE);

  if (totalPages <= 1) {
    $("#pagination-area").empty();
    return;
  }

  const maxVisiblePages = 5;
  let startPage = Math.max(1, currentPage - 2);
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  let paginationHtml = `<ul class="pagination-list" aria-label="Movie result pagination">`;

  paginationHtml += `
    <li><button class="page-btn" type="button" data-page="1" ${currentPage === 1 ? "disabled" : ""}>« First</button></li>
    <li><button class="page-btn" type="button" data-page="${currentPage - 1}" ${currentPage === 1 ? "disabled" : ""}>‹ Prev</button></li>
  `;

  for (let page = startPage; page <= endPage; page++) {
    paginationHtml += `
      <li>
        <button class="page-btn ${page === currentPage ? "active" : ""}" type="button" data-page="${page}" ${page === currentPage ? 'aria-current="page"' : ""}>
          ${page}
        </button>
      </li>
    `;
  }

  paginationHtml += `
    <li><button class="page-btn" type="button" data-page="${currentPage + 1}" ${currentPage === totalPages ? "disabled" : ""}>Next ›</button></li>
    <li><button class="page-btn" type="button" data-page="${totalPages}" ${currentPage === totalPages ? "disabled" : ""}>Last »</button></li>
  `;

  paginationHtml += `</ul>`;

  $("#pagination-area").html(paginationHtml);
}

function goToPage(page) {
  const pageNumber = Number(page);

  if (
    pageNumber < 1 ||
    pageNumber > appState.totalPages ||
    pageNumber === appState.currentPage ||
    appState.isLoading
  ) {
    return;
  }

  searchMovies(appState.currentQuery, pageNumber);
  scrollToResults();
}

function showLoading() {
  const moviesGrid = $("#movies-grid");

  $("#status-area").empty();
  $("#pagination-area").empty();
  moviesGrid.empty();

  for (let index = 0; index < RESULTS_PER_PAGE; index++) {
    moviesGrid.append(`
      <article class="skeleton-card" aria-hidden="true">
        <div class="skeleton-poster"></div>
        <div class="skeleton-content">
          <div class="skeleton-line"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-button"></div>
        </div>
      </article>
    `);
  }
}

function showError(message) {
  $("#movies-grid").html(`
    <section class="error-state">
      <div>
        <span aria-hidden="true">⚠️</span>
        <h3>API Error</h3>
        <p>${escapeHtml(message)}</p>
        <button class="retry-btn" id="retry-btn" type="button">Try Again</button>
      </div>
    </section>
  `);

  $("#pagination-area").empty();
  $("#results-title").text("Unable to load movies");
  $("#results-count").text("Check your API key, internet connection, or daily OMDB limit.");
}

function showEmptyState(query) {
  $("#movies-grid").html(`
    <section class="empty-state">
      <div>
        <span aria-hidden="true">🔍</span>
        <h3>No movies found</h3>
        <p>No movies found for "${escapeHtml(query)}". Try another movie title, actor name, or year.</p>
      </div>
    </section>
  `);

  $("#status-area").empty();
  $("#pagination-area").empty();
  $("#results-title").text(`No results for "${query}"`);
  $("#results-count").text("Try a different movie title.");
  $("#clear-search-btn").removeClass("d-none");
}

function handlePosterError(imgElement) {
  const movieTitle = $(imgElement).attr("alt").replace(" poster", "");
  $(imgElement).replaceWith(buildPosterPlaceholder(escapeHtml(movieTitle)));
}

function scrollToResults() {
  const resultsOffset = $(".main-content").offset().top - 20;

  window.scrollTo({
    top: resultsOffset,
    behavior: "smooth"
  });
}

function handleSearch() {
  const searchValue = $("#search-input").val().trim();

  if (searchValue.length < 2) {
    $("#validation-message").text("Please enter at least 2 characters.");
    $("#search-input").focus();
    return;
  }

  $("#validation-message").text("");
  $(".genre-pill").removeClass("active").removeAttr("aria-current");
  $('.genre-pill[data-genre="all"]').addClass("active").attr("aria-current", "true");
  searchMovies(searchValue, 1);
}

function debounce(callback, delay) {
  let timeoutId;

  return function (...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(function () {
      callback.apply(this, args);
    }, delay);
  };
}

const liveSearch = debounce(function () {
  const query = $("#search-input").val().trim();

  if (query.length >= 2) {
    $("#validation-message").text("");
    searchMovies(query, 1);
  }
}, 600);

$(document).ready(function () {
  searchMovies(DEFAULT_QUERY, 1);

  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    handleSearch();
  });

  $("#search-input").on("input", function () {
    liveSearch();
  });

  $(".genre-pill").on("click", function () {
    const selectedGenre = $(this).data("genre");

    $(".genre-pill").removeClass("active").removeAttr("aria-current");
    $(this).addClass("active").attr("aria-current", "true");

    if (selectedGenre === "all") {
      searchMovies(DEFAULT_QUERY, 1);
      return;
    }

    searchMovies(`${selectedGenre} movie`, 1);
  });

  $(document).on("click", ".view-detail-btn", function () {
    const imdbId = $(this).data("imdb-id");
    showMovieDetail(imdbId);
  });

  $(document).on("click", ".page-btn", function () {
    const selectedPage = $(this).data("page");
    goToPage(selectedPage);
  });

  $("#clear-search-btn").on("click", function () {
    $("#search-input").val("");
    $("#validation-message").text("");
    $(".genre-pill").removeClass("active").removeAttr("aria-current");
    $('.genre-pill[data-genre="all"]').addClass("active").attr("aria-current", "true");
    searchMovies(DEFAULT_QUERY, 1);
  });

  $(document).on("click", "#retry-btn", function () {
    searchMovies(appState.currentQuery || DEFAULT_QUERY, appState.currentPage || 1);
  });

  $("#back-to-top").on("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  $(window).on("scroll", function () {
    $("#back-to-top").toggleClass("show", $(window).scrollTop() > 300);
  });
});