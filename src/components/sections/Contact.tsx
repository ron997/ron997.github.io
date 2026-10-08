import { useEffect, useState } from 'react'
import { person } from '../../content/resume'
import { useFitText } from '../../lib/hooks'
import { orderOf } from '../../lib/layout'
import { Detected } from '../ui/Detected'
import { Icon } from '../ui/Icon'
import { Pill } from '../ui/Pill'
import './Contact.css'

/** The contact field, extracted and set at full width. */
export function Contact() {
  const emailRef = useFitText<HTMLAnchorElement>(176)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(t)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(person.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${person.email}`
    }
  }

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-h">
      <div className="container">
        <div className="panel panel--signal on-light contact__panel">
          <h2 id="contact-h" className="contact__lead">
            Hiring for an ML, computer-vision or GenAI role, or need a pipeline built? Write to me.
          </h2>
          <div className="contact__email-box fit-box">
            <Detected label={`${orderOf('[phone redacted]') ?? 2} · contact · email`} pad="-0.1em -10px -0.1em -0.06em" amount={0.5}>
              <a ref={emailRef} className="contact__email fit" href={`mailto:${person.email}`}>{person.email}</a>
            </Detected>
          </div>
          <div className="contact__actions">
            <button type="button" className="pill pill--ink" onClick={copy} aria-live="polite">
              {copied ? 'Copied to clipboard' : 'Copy email'}
              <Icon name={copied ? 'check' : 'copy'} />
            </button>
            <Pill variant="ink" href={person.linkedin} icon="linkedin">LinkedIn</Pill>
            <Pill variant="ink" href={person.github} icon="github">GitHub</Pill>
            <Pill variant="ghost" href={person.resume} download icon="download">Download resume</Pill>
          </div>
        </div>
      </div>
    </section>
  )
}
