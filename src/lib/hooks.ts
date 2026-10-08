import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'

/**
 * Fires once when `amount` of the element has been visible, on a bare
 * IntersectionObserver (not Motion's frame loop: a reveal that decides whether
 * content is visible must not depend on requestAnimationFrame).
 * `amount` is a fraction of the ELEMENT, so it is capped at viewport / element height.
 */
export function useInViewOnce<T extends Element>(ref: RefObject<T | null>, amount = 0.3): boolean {
  // Without IntersectionObserver there is nothing to wait for: start revealed.
  const [seen, setSeen] = useState(() => typeof IntersectionObserver === 'undefined')
  useEffect(() => {
    const el = ref.current
    if (!el || seen) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setSeen(true)
        io.disconnect()
      },
      { threshold: amount },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [ref, amount, seen])
  return seen
}

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

/**
 * Sizes one line of display text to its container (Curvedpixel sized its section
 * labels to the container, never the viewport). The hook measures the text's
 * width-to-size ratio once per font load; CSS does the rest with container
 * units (`.fit` inside a `.fit-box`), so resizing never races a script.
 */
export function useFitText<T extends HTMLElement>(max: number) {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--fit-max', `${max}px`)
    const measure = () => {
      // Measure at a fixed 100px with transitions off, so no in-flight transition
      // can report the previous size.
      const transition = el.style.transition
      el.style.transition = 'none'
      el.dataset.measuring = ''
      const natural = el.scrollWidth
      delete el.dataset.measuring
      el.style.transition = transition
      if (natural > 0) el.style.setProperty('--fit-ratio', (natural / 100).toFixed(4))
    }
    measure()
    document.fonts?.ready.then(measure)
    document.fonts?.addEventListener('loadingdone', measure)
    return () => document.fonts?.removeEventListener('loadingdone', measure)
  }, [max])
  return ref
}
