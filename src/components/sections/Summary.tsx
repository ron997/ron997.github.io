import { person, summary, summaryMarks } from '../../content/resume'
import { orderOf } from '../../lib/layout'
import { ScrollWordReveal } from '../motion/ScrollWordReveal'
import { Detected } from '../ui/Detected'
import './Summary.css'

/** The professional summary, read word by word as it scrolls past, its key phrases marked. */
export function Summary() {
  return (
    <section className="section summary on-light" id="summary" aria-labelledby="summary-h">
      <div className="container summary__inner">
        <h2 id="summary-h" className="sr-only">Summary</h2>
        <Detected label={`${orderOf('Data Scientist and ML engineer with a Master')} · text · summary`} pad="-0.45em -0.55em" amount={0.25} className="summary__det">
          <ScrollWordReveal className="summary__text" text={summary} marks={summaryMarks} />
        </Detected>
        <dl className="facts">
          <div><dt className="mono">Now</dt><dd>{person.now}</dd></div>
          <div><dt className="mono">Studied</dt><dd>{person.studied}</dd></div>
          <div><dt className="mono">Based in</dt><dd>{person.location}</dd></div>
        </dl>
      </div>
    </section>
  )
}
