import styles from './HomePage.module.css'

function HomePage() {
  return (
    <section className={`container ${styles.hero}`}>
      <p className={styles.eyebrow}>Movie Search</p>
      <h1 className={styles.title}>Find the film you're thinking of.</h1>
      <p className={styles.subtitle}>
        Search is wired up in the next phase, once the backend API contract
        is in place.
      </p>
    </section>
  )
}

export default HomePage
