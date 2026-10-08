import { person } from '../content/resume'
import { elements } from '../lib/layout'
import { Icon } from './ui/Icon'
import './Footer.css'

const YEAR = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="footer container on-light">
      <p className="footer__who">© {YEAR} {person.name} · {person.location}</p>
      <p className="footer__note mono">
        This page reads its own resume: {elements.length} layout elements, extracted from the PDF with PyMuPDF at build time.
      </p>
      <a className="footer__top" href="#top">Back to top <Icon name="up" /></a>
    </footer>
  )
}
