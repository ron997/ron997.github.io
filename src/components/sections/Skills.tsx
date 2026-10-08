import { skills } from '../../content/resume'
import { orderOf } from '../../lib/layout'
import { Giant } from '../ui/Giant'
import './Skills.css'

/** The five key/value lines of the resume's skills block, set as type. */
export function Skills() {
  return (
    <section className="section skills on-light" id="skills" aria-labelledby="skills-h">
      <Giant id="skills-h" text="Technical skills" label={`section-header · ${orderOf('TECHNICAL SKILLS')}`} />
      <div className="container">
        <dl className="skills__list">
          {skills.map((g) => (
            <div className="skills__row" key={g.key}>
              <dt>
                <span className="skills__key">{g.key}</span>
                <span className="skills__line mono">key-value · line {orderOf(g.key)}</span>
              </dt>
              <dd>
                <ul className="skills__values">
                  {g.values.map((v) => <li key={v}>{v}</li>)}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
