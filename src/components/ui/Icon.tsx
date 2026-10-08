/** Authored icons, one 2px stroke on a 20px grid (brand marks are filled). */
type Name = 'arrow' | 'download' | 'copy' | 'check' | 'up' | 'menu' | 'close' | 'linkedin' | 'github' | 'mail'

const paths: Record<Name, React.ReactNode> = {
  arrow: <path d="M5.5 14.5 14.5 5.5M7.5 5.5h7v7" />,
  download: <path d="M10 3.5v10M5.5 9.5 10 14l4.5-4.5M4 17h12" />,
  copy: <><rect x="6.5" y="6.5" width="10" height="10" rx="2" /><path d="M13.5 4.5v-.5a1.5 1.5 0 0 0-1.5-1.5H5A1.5 1.5 0 0 0 3.5 4v7A1.5 1.5 0 0 0 5 12.5h.5" /></>,
  check: <path d="m4.5 10.5 3.5 3.5 7.5-8" />,
  up: <path d="M10 16.5v-13M5 8.5l5-5 5 5" />,
  menu: <path d="M3.5 7h13M3.5 13h13" />,
  close: <path d="m5 5 10 10M15 5 5 15" />,
  mail: <><rect x="2.5" y="4.5" width="15" height="11" rx="2" /><path d="m3.5 6 6.5 5 6.5-5" /></>,
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M4.6 7.4h2.6V16H4.6V7.4Zm1.3-4.2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm2.9 4.2h2.5v1.2h.04c.35-.66 1.2-1.36 2.47-1.36 2.64 0 3.13 1.74 3.13 4V16h-2.6v-4.27c0-1.02-.02-2.33-1.42-2.33-1.42 0-1.64 1.11-1.64 2.26V16H8.8V7.4Z"
    />
  ),
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M10 2a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.35c-2.23.48-2.7-1.07-2.7-1.07-.36-.93-.89-1.17-.89-1.17-.73-.5.05-.49.05-.49.8.06 1.23.83 1.23.83.71 1.23 1.87.87 2.33.67.07-.52.28-.87.5-1.07-1.78-.2-3.65-.89-3.65-3.96 0-.87.31-1.59.83-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.08-1.87 3.76-3.66 3.96.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 10 2Z"
    />
  ),
}

export function Icon({ name, className }: { name: Name; className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  )
}
