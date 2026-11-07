// The thin arrow used throughout the original site (exact SVG paths).
const paths = {
  'up-right': 'M7 17 17 7M7 7h10v10',
  'down-right': 'M7 7l10 10M7 17h10V7',
  down: 'M12 4v16m-6-6 6 6 6-6',
} as const

export function ArrowIcon({ direction = 'up-right' }: { direction?: keyof typeof paths }) {
  return (
    <svg
      className="icon-arrow"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  )
}
