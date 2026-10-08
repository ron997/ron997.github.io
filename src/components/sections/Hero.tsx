import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import page816 from '../../assets/resume-page-816.webp'
import page1224 from '../../assets/resume-page-1224.webp'
import page1836 from '../../assets/resume-page-1836.webp'
import { person, summaryShort, topSkills } from '../../content/resume'
import { useFitText, useMediaQuery } from '../../lib/hooks'
import { classCount, elements, layout, targets, type LayoutElement } from '../../lib/layout'
import { Pill } from '../ui/Pill'
import './Hero.css'

const pct = (n: number) => `${(n * 100).toFixed(3)}%`
const excerpt = (t: string) => (t.length > 54 ? `${t.replace(/^•\s*/, '').slice(0, 52).trimEnd()}…` : t.replace(/^•\s*/, ''))

/**
 * FIRST VIEWPORT: the resume being read. Every box is a layout element PyMuPDF
 * extracted from the PDF at build time; they land in reading order, the phone
 * number is redacted, and a wire carries the extracted title into the headline.
 * Each box links to the section of this site that renders it.
 */
export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const pageRef = useRef<HTMLElement>(null)
  const titleBoxRef = useRef<HTMLAnchorElement>(null)
  const firstLineRef = useRef<HTMLSpanElement>(null)
  const nameRef = useFitText<HTMLHeadingElement>(156)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const [hover, setHover] = useState<LayoutElement | null>(null)
  const [wire, setWire] = useState<{ d: string; a: [number, number]; b: [number, number]; len: number } | null>(null)

  useLayoutEffect(() => {
    if (!desktop) return
    const hero = heroRef.current
    if (!hero) return
    const measure = () => {
      const box = titleBoxRef.current
      const line = firstLineRef.current
      if (!box || !line) return
      const h = hero.getBoundingClientRect()
      const a = box.getBoundingClientRect()
      const b = line.getBoundingClientRect()
      const x1 = a.right - h.left + 2
      const y1 = a.top + a.height / 2 - h.top
      const x2 = b.left - h.left - 18
      const y2 = b.top + b.height * 0.52 - h.top
      const mx = x1 + (x2 - x1) * 0.55
      const d = `M${x1.toFixed(1)} ${y1.toFixed(1)} C ${mx.toFixed(1)} ${y1.toFixed(1)}, ${mx.toFixed(1)} ${y2.toFixed(1)}, ${x2.toFixed(1)} ${y2.toFixed(1)}`
      const len = Math.hypot(x2 - x1, y2 - y1) * 1.25
      setWire({ d, a: [x1, y1], b: [x2, y2], len })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(hero)
    document.fonts?.ready.then(measure)
    // The page settles from its entrance transform; measure the resting box.
    const page = pageRef.current
    const settled = (ev: AnimationEvent) => { if (ev.target === page) measure() }
    page?.addEventListener('animationend', settled)
    window.addEventListener('load', measure)
    document.fonts?.addEventListener('loadingdone', measure)
    return () => {
      ro.disconnect()
      document.fonts?.removeEventListener('loadingdone', measure)
      page?.removeEventListener('animationend', settled)
      window.removeEventListener('load', measure)
    }
  }, [desktop])

  const target = hover ? targets.get(hover.order) : undefined

  return (
    <section ref={heroRef} className="hero on-night" id="top" aria-labelledby="hero-name">
      <div className="hero__stage">
        <figure ref={pageRef} className="hero__page">
          <img
            src={page1224}
            srcSet={`${page816} 816w, ${page1224} 1224w, ${page1836} 1836w`}
            sizes="(min-width: 1024px) 36vw, 80vw"
            width={1224}
            height={1584}
            alt="Page one of my resume, with the phone number redacted"
            fetchPriority="high"
          />
          <div className="hero__boxes" aria-hidden="true">
            {elements.map((e, i) => {
              const [x0, y0, x1, y1] = e.bbox
              const t = targets.get(e.order)
              return (
                <a
                  key={e.order}
                  ref={e.cls === 'title' ? titleBoxRef : undefined}
                  className={`lbox${hover?.order === e.order ? ' is-hover' : ''}`}
                  data-cls={e.cls}
                  href={`#${t?.id ?? 'top'}`}
                  tabIndex={-1}
                  style={{
                    left: `calc(${pct(x0)} - 3px)`,
                    top: `calc(${pct(y0)} - 2px)`,
                    width: `calc(${pct(x1 - x0)} + 6px)`,
                    height: `calc(${pct(y1 - y0)} + 4px)`,
                    '--i': i,
                  } as CSSProperties}
                  onMouseEnter={() => setHover(e)}
                  onMouseLeave={() => setHover(null)}
                >
                  <b>{e.order} {e.cls}</b>
                </a>
              )
            })}
            {layout.redactions.map((r) => (
              <span
                key={r.cls}
                className="lbox lbox--redact"
                style={{ left: pct(r.bbox[0]), top: pct(r.bbox[1]), width: pct(r.bbox[2] - r.bbox[0]), height: pct(r.bbox[3] - r.bbox[1]) } as CSSProperties}
              >
                <b>{r.cls} · redacted</b>
              </span>
            ))}
          </div>
        </figure>
        <p className="hero__inspector mono" aria-live="off">
          {hover ? (
            <>
              <span className="hl">{hover.order}</span> · {hover.cls} · “{excerpt(hover.text)}” <span className="hl">→ {target?.label}</span>
            </>
          ) : (
            <>
              <span className="hl">{elements.length}</span> layout elements · {classCount} classes · <span className="hl">{layout.redactions.length}</span> redaction · hover a box
            </>
          )}
        </p>
      </div>

      <div className="hero__fields">
        <div className="field field--title rise" style={{ '--d': '.05s' } as CSSProperties}>
          <span className="field__k mono" aria-hidden="true">title</span>
          <div className="hero__name-box fit-box">
            <h1 ref={nameRef} id="hero-name" className="hero__name fit">
              <span ref={firstLineRef}>{person.first}</span>{' '}
              <span>{person.last}</span>
            </h1>
          </div>
        </div>
        <div className="field field--summary rise" style={{ '--d': '.16s' } as CSSProperties}>
          <span className="field__k mono" aria-hidden="true">summary</span>
          <p className="hero__lede">{summaryShort}</p>
        </div>
        <div className="field field--skills rise" style={{ '--d': '.27s' } as CSSProperties}>
          <span className="field__k mono" aria-hidden="true">skills</span>
          <ul className="chips" aria-label="Selected skills">
            {topSkills.map((s) => <li key={s} className="chip">{s}</li>)}
          </ul>
        </div>
        <div className="field field--contact rise" style={{ '--d': '.38s' } as CSSProperties}>
          <span className="field__k mono" aria-hidden="true">contact</span>
          <div>
            <div className="hero__cta">
              <Pill href={`mailto:${person.email}`}>Email me</Pill>
              <Pill variant="ghost" href={person.resume} download icon="download">Download resume</Pill>
            </div>
            <p className="hero__where mono">{person.email} · {person.location}</p>
          </div>
        </div>
      </div>

      {desktop && wire && (
        <svg className="hero__wire" aria-hidden="true" style={{ '--len': wire.len.toFixed(0) } as CSSProperties}>
          <path d={wire.d} />
          <circle cx={wire.a[0]} cy={wire.a[1]} r="3.5" />
          <circle cx={wire.b[0]} cy={wire.b[1]} r="4.5" />
        </svg>
      )}
    </section>
  )
}
