import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'

/**
 * Curvedpixel's signature read (from hanzo's intro): copy split per word, each
 * word's opacity scrubbed by scroll across its own equal window, bidirectional,
 * no blur and no travel. Here the marked phrases also get the highlighter, swept
 * in across the same window, the way a reader marks a page.
 *
 * Progress 0 when the block's top is at 78% of the viewport, 1 at 30%.
 */
export function ScrollWordReveal({
  text,
  marks = [],
  className,
  restOpacity = 0.18,
}: {
  text: string
  marks?: string[]
  className?: string
  restOpacity?: number
}) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.78', 'start 0.3'] })

  // Which word indexes fall inside a marked phrase.
  const words = text.split(' ')
  const marked = new Set<number>()
  for (const phrase of marks) {
    const pw = phrase.split(' ')
    for (let i = 0; i + pw.length <= words.length; i++) {
      if (pw.every((w, k) => words[i + k] === w)) for (let k = 0; k < pw.length; k++) marked.add(i + k)
    }
  }

  if (reduced) {
    return (
      <p ref={ref} className={className}>
        {words.map((w, i) =>
          marked.has(i) ? (
            <span key={i}><mark>{marked.has(i + 1) ? `${w} ` : w}</mark>{marked.has(i + 1) ? '' : ' '}</span>
          ) : (
            `${w} `
          ),
        )}
      </p>
    )
  }

  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word
          key={i}
          word={word}
          marked={marked.has(i)}
          joinNext={marked.has(i) && marked.has(i + 1)}
          start={i / words.length}
          end={(i + 1) / words.length}
          progress={scrollYProgress}
          restOpacity={restOpacity}
        />
      ))}
    </p>
  )
}

function Word({
  word, marked, joinNext, start, end, progress, restOpacity,
}: {
  word: string
  marked: boolean
  joinNext?: boolean
  start: number
  end: number
  progress: MotionValue<number>
  restOpacity: number
}) {
  const opacity = useTransform(progress, [start, end], [restOpacity, 1])
  const sweep = useTransform(progress, [start, Math.min(1, end + 0.04)], ['0% 0.42em', '100% 0.42em'])
  if (!marked) return <motion.span style={{ opacity }}>{`${word} `}</motion.span>
  return (
    <motion.span style={{ opacity }}>
      <motion.mark style={{ backgroundSize: sweep }}>{joinNext ? `${word} ` : word}</motion.mark>{joinNext ? '' : ' '}
    </motion.span>
  )
}
