import { useState } from 'react'
import styles from './ImageFallback.module.css'

function ImageFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (!src || failed) {
    return (
      <div className={`${styles.placeholder} ${className ?? ''}`} role="img" aria-label={alt}>
        <span aria-hidden="true">🎬</span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`${className ?? ''} ${styles.image} ${loaded ? styles.loaded : ''}`}
      loading="lazy"
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
    />
  )
}

export default ImageFallback
