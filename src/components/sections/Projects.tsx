import { projects } from '../../content/resume'
import { orderOf } from '../../lib/layout'
import { Giant } from '../ui/Giant'
import './Projects.css'

/** Each project as a parsed field: name and source line as the key, the sentence and stack as the value. */
export function Projects() {
  return (
    <section className="section projects" id="projects" aria-labelledby="projects-h">
      <Giant id="projects-h" text="Projects" label={`section-header · ${orderOf('PROJECTS')}`} />
      <div className="container">
        <div className="panel panel--light on-light projects__panel">
          <dl className="projects__list">
            {projects.map((p) => (
              <div key={p.name} className="project">
                <dt className="project__key">
                  <span className="project__name">{p.name}</span>
                  <span className="project__src mono">org · line {orderOf(p.name)}</span>
                </dt>
                <dd className="project__value">
                  <p className="project__text">{p.text}</p>
                  <ul className="project__stack" aria-label={`${p.name} stack`}>
                    {p.tools.map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
