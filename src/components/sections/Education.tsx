import { useRef } from 'react'
import bwAvif from '../../assets/portrait-bw.avif'
import bwWebp from '../../assets/portrait-bw.webp'
import colourAvif from '../../assets/portrait-colour.avif'
import colourWebp from '../../assets/portrait-colour.webp'
import { education } from '../../content/resume'
import { useInViewOnce } from '../../lib/hooks'
import { orderOf } from '../../lib/layout'
import { Giant } from '../ui/Giant'
import './Education.css'

/**
 * The photo is black and white at rest; the colour twin resolves inside the
 * box around me, then everywhere on hover. Touch devices get it on scroll,
 * since they never hover (Curvedpixel's ScrollLit rule).
 */
export function Education() {
  const photoRef = useRef<HTMLElement>(null)
  const lit = useInViewOnce(photoRef, 0.45)

  return (
    <section className="section education" id="education" aria-labelledby="education-h">
      <Giant id="education-h" text="Education" label={`section-header · ${orderOf('EDUCATION')}`} />
      <div className="container">
        <div className="panel panel--night on-night education__panel">
          <figure ref={photoRef} className={`portrait${lit ? ' is-lit' : ''}`}>
            <picture>
              <source type="image/avif" srcSet={bwAvif} />
              <img src={bwWebp} width={960} height={1280} loading="lazy" decoding="async" alt="Rounak Burman at his graduation from UMass Boston, holding his diploma folder" />
            </picture>
            <picture className="portrait__colour" aria-hidden="true">
              <source type="image/avif" srcSet={colourAvif} />
              <img src={colourWebp} width={960} height={1280} loading="lazy" decoding="async" alt="" />
            </picture>
            <span className="portrait__box" aria-hidden="true"><b>Rounak · MS, May 2024</b></span>
            <figcaption className="mono">Commencement, UMass Boston</figcaption>
          </figure>

          <ol className="degrees">
            {education.map((d) => {
              const from = orderOf(d.degree)
              return (
                <li key={d.degree} className="degree">
                  <h3 className="degree__name">{d.degree}</h3>
                  <p className="degree__school">{d.school}</p>
                  <p className="degree__place mono">
                    <span className="degree__date">{d.date}</span> · {d.place}{from ? ` · role · line ${from}` : ''}
                  </p>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
