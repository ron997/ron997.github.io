import type { AnchorHTMLAttributes, ReactNode } from 'react'
import { Icon } from './Icon'

type Variant = 'signal' | 'ink' | 'ghost'

/** The button grammar: a pill whose arrow pulls away on hover. */
export function Pill({
  variant = 'signal',
  size,
  icon = 'arrow',
  children,
  className = '',
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: 'sm'
  icon?: 'arrow' | 'download' | 'linkedin' | 'github' | 'mail' | null
  children: ReactNode
}) {
  const external = rest.href?.startsWith('http')
  return (
    <a
      className={`pill pill--${variant}${size ? ` pill--${size}` : ''} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...rest}
    >
      {children}
      {icon && <Icon name={icon} />}
    </a>
  )
}
