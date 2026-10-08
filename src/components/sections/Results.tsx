import { experience, results } from '../../content/resume'
import { orderOf } from '../../lib/layout'
import { CountUp } from '../motion/CountUp'
import { Giant } from '../ui/Giant'
import './Results.css'

/** Which role a bullet belongs to, for the source column. */
function roleOf(prefix: string) {
  for (const o of experience) {
    for (const r of o.roles) {
      if (r.bullets.some((b) => b.text.startsWith(prefix))) return `${o.org}, ${r.title}`
    }
  }
  return ''
}

/** Every measured result in the resume as one ledger, each row traced to the line it was read from. */
export function Results() {
  return (
    <section className="section results" id="results" aria-labelledby="results-h">
      <Giant id="results-h" text="Results" label={`table · derived · ${results.length} rows`} />
      <div className="container">
        <div className="panel panel--night on-night results__panel">
          <table className="ledger">
            <caption className="sr-only">Measured results from my resume, with the resume line each comes from</caption>
            <thead>
              <tr className="mono">
                <th scope="col">Figure</th>
                <th scope="col">Result</th>
                <th scope="col">Method</th>
                <th scope="col">Source</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.what}>
                  <td className="ledger__fig"><CountUp to={r.value} prefix={r.prefix} suffix={r.suffix} /></td>
                  <td className="ledger__what">{r.what}</td>
                  <td className="ledger__how mono">{r.how}</td>
                  <td className="ledger__src mono">line {orderOf(r.source)} · {roleOf(r.source)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
