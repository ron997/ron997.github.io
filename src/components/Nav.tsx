import { useEffect, useState } from 'react'
import { person } from '../content/resume'
import { Icon } from './ui/Icon'
import { Pill } from './ui/Pill'
import './Nav.css'

const LINKS = [
  { href: '#results', label: 'Results' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => {
    if (!open) return
    const close = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', close)
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', close)
      document.documentElement.style.overflow = ''
    }
  }, [open])

  return (
    <header className={`nav on-light${scrolled || open ? ' is-solid' : ''}${open ? ' is-open' : ''}`}>
      <div className="nav__bar">
        <a className="nav__brand" href="#top" aria-label={`${person.name}, back to top`} onClick={() => setOpen(false)}>
          <span className="nav__mark" aria-hidden="true">RB</span>
          <span>{person.name}</span>
        </a>
        <nav className="nav__links" aria-label="Sections">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="nav__end">
          <Pill className="nav__cta" size="sm" href={`mailto:${person.email}`}>Email me</Pill>
          <button
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="nav-sheet"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((o) => !o)}
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      <div id="nav-sheet" className="nav__sheet" hidden={!open}>
        <nav aria-label="Sections">
          {LINKS.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ '--i': i } as React.CSSProperties}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav__sheet-cta">
          <Pill href={`mailto:${person.email}`} icon="mail">Email me</Pill>
          <Pill variant="ghost" href={person.resume} download icon="download">Download resume</Pill>
        </div>
      </div>
    </header>
  )
}
