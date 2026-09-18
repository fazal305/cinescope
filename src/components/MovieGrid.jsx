import MovieCard from './MovieCard.jsx'
import styles from './MovieGrid.module.css'

function MovieGrid({ movies }) {
  return (
    <ul className={styles.grid} aria-label="Movie results">
      {movies.map((movie) => (
        <li key={movie.id}>
          <MovieCard movie={movie} />
        </li>
      ))}
    </ul>
  )
}

export default MovieGrid
