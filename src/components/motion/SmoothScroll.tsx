import Lenis from 'lenis'
import { useEffect } from 'react'

/**
 * Inertial scrolling, ported from the Curvedpixel build (whose values were read
 * from its reference sites). Off for reduced motion and for coarse pointers:
 * on touch, native scrolling beats anything synthesised.
 */
const LENIS_OPTIONS = {
  smoothWheel: true,
  duration: 1,
  lerp: 0.1,
  wheelMultiplier: 1,
  easing: (t: number) => Math.min(1, 1.001 - 2 ** (-10 * t)),
  syncTouch: false,
  anchors: { offset: -84 },
  overscroll: true,
} as const

export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const coarse = window.matchMedia('(pointer: coarse)')
    let lenis: Lenis | null = null
    let raf = 0

    const start = () => {
      if (lenis || reduced.matches || coarse.matches) return
      lenis = new Lenis(LENIS_OPTIONS)
      ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis
      const tick = (time: number) => {
        lenis?.raf(time)
        raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
      ;(window as unknown as { __lenis?: Lenis }).__lenis = undefined
    }
    const sync = () => { stop(); start() }

    start()
    reduced.addEventListener('change', sync)
    coarse.addEventListener('change', sync)
    return () => {
      reduced.removeEventListener('change', sync)
      coarse.removeEventListener('change', sync)
      stop()
    }
  }, [])
  return null
}
