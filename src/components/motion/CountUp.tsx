import { animate, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useInViewOnce } from '../../lib/hooks'

const format = (n: number) => n.toLocaleString('en-US')

/**
 * Counter from Curvedpixel (via agero): a hidden ghost holding the final value
 * reserves the width, and the ticking number sits on top of it, so digits never
 * reflow the line. Fires once. Screen readers get the final value only.
 */
export function CountUp({
  to, prefix = '', suffix = '', duration = 1.6, className,
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInViewOnce(ref, 0.6)
  const reduced = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView || reduced) return
    const controls = animate(0, to, {
      duration,
      ease: [0.25, 1, 0.5, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, reduced, to, duration])

  const shown = reduced ? to : value
  const final = `${prefix}${format(to)}${suffix}`

  return (
    <span ref={ref} className={className} style={{ position: 'relative', display: 'inline-block' }}>
      <span className="sr-only">{final}</span>
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>{final}</span>
      <span aria-hidden="true" style={{ position: 'absolute', inset: 0 }}>
        {prefix}{format(shown)}{suffix}
      </span>
    </span>
  )
}
