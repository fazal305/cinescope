import { useEffect, useRef } from 'react'

// Moves focus to a heading on route mount so screen reader users land on
// the new page's content instead of silently staying wherever they were —
// React Router doesn't manage focus for client-side navigations on its own.
export function useAutoFocus(...deps) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current?.focus()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
