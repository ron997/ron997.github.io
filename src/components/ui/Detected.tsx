import { useRef, type CSSProperties, type ReactNode } from 'react'
import { useInViewOnce } from '../../lib/hooks'

/**
 * The parse continues down the page: wraps an element and, once it is in view,
 * draws a detection box around it (corners snap, edges draw, the class chip
 * lands), the same box the hero draws on the resume.
 */
export function Detected({
  label,
  children,
  as: Tag = 'div',
  below = false,
  pad,
  amount = 0.6,
  className = '',
}: {
  label: string
  children: ReactNode
  as?: 'div' | 'span'
  below?: boolean
  pad?: string
  amount?: number
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const seen = useInViewOnce(ref, amount)
  return (
    <Tag
      ref={ref as never}
      className={`det${seen ? ' is-in' : ''}${below ? ' det--below' : ''} ${className}`}
      style={pad ? ({ '--det-pad': pad } as CSSProperties) : undefined}
    >
      {children}
      <span className="det__box" aria-hidden="true">
        <i className="det__edge det__edge--t" />
        <i className="det__edge det__edge--r" />
        <i className="det__edge det__edge--b" />
        <i className="det__edge det__edge--l" />
        <i className="det__corner det__corner--tl" />
        <i className="det__corner det__corner--tr" />
        <i className="det__corner det__corner--bl" />
        <i className="det__corner det__corner--br" />
        <b className="det__chip"><span>{label}</span></b>
      </span>
    </Tag>
  )
}
