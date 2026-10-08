import type { CSSProperties } from 'react'
import { useFitText } from '../../lib/hooks'
import { Detected } from './Detected'

/**
 * A section heading set as the resume's own section header, at the size of the
 * container: the h2 itself, never a label above one. The detection chip names
 * the layout class and reading-order line PyMuPDF gave it.
 */
export function Giant({ text, label, id, max = 208 }: { text: string; label: string; id?: string; max?: number }) {
  const ref = useFitText<HTMLHeadingElement>(max)
  return (
    <div className="giant-wrap container fit-box">
      <Detected label={label} pad="0.02em -0.025em -0.035em" amount={0.4}>
        <h2 ref={ref} id={id} className="giant fit" style={{ '--fit-ratio': (text.length * 0.78).toFixed(2) } as CSSProperties}>{text}</h2>
      </Detected>
    </div>
  )
}
