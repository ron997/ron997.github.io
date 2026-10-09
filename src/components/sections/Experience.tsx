import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { createRef, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import { experience, type Bullet, type Role } from '../../content/resume'
import { useMediaQuery } from '../../lib/hooks'
import { orderOf } from '../../lib/layout'
import { Giant } from '../ui/Giant'
import './Experience.css'

type Card = { org: string; place: string; role: Role; first: boolean }
const CARDS: Card[] = experience.flatMap((o) => o.roles.map((role, i) => ({ org: o.org, place: o.place, role, first: i === 0 })))

/** Keyword rules that tag a role the way a tagging pipeline would. Shown as derived, never as claims. */
const TAGS: [string, RegExp][] = [
  ['vision', /\b(vision|yolo|deepsort|detect|pose|corrosion|keypoint|tracking)/i],
  ['documents', /\b(ocr|docling|pdf|pictogram|extraction)/i],
  ['agents', /\b(langgraph|multi-agent|llm)/i],
  ['video', /\b(video|footage|twelvelabs)/i],
  ['speech', /\b(whisper|tts|commentary)/i],
  ['nlp', /\b(bert|gensim|embedding|summarization|topic)/i],
  ['data', /\b(sql|mongodb|records|database|deduplicate|sales)/i],
  ['web', /\b(web|react|flask|apis|javascript|pyqt5|desktop app)/i],
]
const tagsFor = (role: Role) => TAGS.filter(([, re]) => role.bullets.some((b) => re.test(b.text))).map(([t]) => t)

/** Bullet text with its metrics marked and its tools set bold, as the resume does. */
function renderBullet(b: Bullet): ReactNode[] {
  const spans: { start: number; end: number; kind: 'mark' | 'strong' }[] = []
  for (const m of b.metrics ?? []) {
    const i = b.text.indexOf(m)
    if (i >= 0) spans.push({ start: i, end: i + m.length, kind: 'mark' })
  }
  for (const t of b.tools ?? []) {
    const i = b.text.indexOf(t)
    if (i >= 0 && !spans.some((s) => i < s.end && i + t.length > s.start)) spans.push({ start: i, end: i + t.length, kind: 'strong' })
  }
  spans.sort((a, z) => a.start - z.start)
  const out: ReactNode[] = []
  let at = 0
  spans.forEach((s, k) => {
    if (s.start > at) out.push(b.text.slice(at, s.start))
    const piece = b.text.slice(s.start, s.end)
    out.push(s.kind === 'mark' ? <mark key={k}>{piece}</mark> : <strong key={k}>{piece}</strong>)
    at = s.end
  })
  out.push(b.text.slice(at))
  return out
}

/**
 * Whether every card can be read in full below its sticky offset. Card heights
 * depend on the width and the content, so this is measured rather than assumed
 * from a viewport height: a card taller than the space under its offset would
 * have its last lines covered by the next card before they could be seen.
 */
function useStackFits(ref: RefObject<HTMLDivElement | null>) {
  const [fits, setFits] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const check = () => {
      const navH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 76
      const cards = [...el.querySelectorAll<HTMLElement>('.role')]
      setFits(cards.length > 0 && cards.every((c, i) => navH + 24 + i * 20 + c.offsetHeight <= window.innerHeight - 8))
    }
    const ro = new ResizeObserver(check) // also fires once on observe
    ro.observe(el)
    window.addEventListener('resize', check)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', check)
    }
  }, [ref])
  return fits
}

export function Experience() {
  const refs = useMemo(() => CARDS.map(() => createRef<HTMLDivElement>()), [])
  const stackRef = useRef<HTMLDivElement>(null)
  const wide = useMediaQuery('(min-width: 1024px)')
  const fits = useStackFits(stackRef)
  const stacked = wide && fits

  return (
    <section className="section experience" id="experience" aria-labelledby="experience-h">
      <Giant id="experience-h" text="Work experience" label={`section-header · ${orderOf('WORK EXPERIENCE')}`} />
      <div className="container">
        <div className="panel panel--light on-light experience__panel">
          <div ref={stackRef} className={`stack${stacked ? ' is-stacked' : ''}`}>
            {CARDS.map((c, i) => (
              <RoleCard key={c.role.id} card={c} index={i} cardRef={refs[i]} nextRef={refs[i + 1]} stacked={stacked} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function RoleCard({
  card, index, cardRef, nextRef, stacked,
}: {
  card: Card
  index: number
  cardRef: RefObject<HTMLDivElement | null>
  nextRef?: RefObject<HTMLDivElement | null>
  stacked: boolean
}) {
  const { org, place, role, first } = card
  const reduced = useReducedMotion()
  // Card N's exit is driven by card N+1 arriving: it feels pushed, not faded.
  const { scrollYProgress } = useScroll({ target: (nextRef ?? cardRef) as RefObject<HTMLElement>, offset: ['start end', 'start start'] })
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const shade = useTransform(scrollYProgress, [0.2, 1], [0, 0.62])
  const animate = stacked && !reduced && !!nextRef

  const from = orderOf(first ? org : role.title)
  const to = orderOf(role.bullets[role.bullets.length - 1].text)
  const tags = tagsFor(role)

  return (
    <div
      ref={cardRef}
      id={role.id}
      className="stack__item"
      style={stacked ? { top: `calc(var(--nav-h) + 24px + ${index * 20}px)`, zIndex: index + 1 } : undefined}
    >
      <motion.article className="role" style={animate ? { scale } : undefined} aria-labelledby={`${role.id}-h`}>
        <div className="role__side">
          <div className="role__who">
            <h3 id={`${role.id}-h`} className="role__org">{org}</h3>
            <p className="role__title">{role.title}</p>
          </div>
          <dl className="role__meta mono">
            <div><dt>When</dt><dd>{role.dates}</dd></div>
            <div><dt>Where</dt><dd>{place}</dd></div>
            <div><dt>Resume</dt><dd>{from && to ? `lines ${from}–${to}` : ''}</dd></div>
          </dl>
          {tags.length > 0 && (
            <p className="role__tags mono" aria-label={`Tags: ${tags.join(', ')}`}>
              <span className="role__tags-k">tags</span>
              {tags.map((t) => <span key={t} className="role__tag">{t}</span>)}
            </p>
          )}
        </div>
        <ul className="role__bullets">
          {role.bullets.map((b) => <li key={b.text.slice(0, 32)}>{renderBullet(b)}</li>)}
        </ul>
        {animate && <motion.span className="role__shade" style={{ opacity: shade }} aria-hidden="true" />}
      </motion.article>
    </div>
  )
}
