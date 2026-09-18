export function formatRuntime(minutes) {
  if (!Number.isFinite(minutes) || minutes <= 0) return null
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  if (hours === 0) return `${remaining}m`
  if (remaining === 0) return `${hours}h`
  return `${hours}h ${remaining}m`
}

export function formatRating(rating) {
  if (rating === null || rating === undefined || Number.isNaN(rating)) {
    return null
  }
  return Number(rating).toFixed(1)
}
