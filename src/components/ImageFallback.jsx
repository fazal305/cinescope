import { useState } from 'react'
import styles from './ImageFallback.module.css'

function ImageFallback({ src, alt, className }) {
  const [failed, setFailed] = useState(false)

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
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  )
}

export default ImageFallback
