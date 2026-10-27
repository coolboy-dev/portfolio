export function Logo({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="currentColor" />
      <path
        d="M20 18l12 15l12-15M32 33v14"
        fill="none"
        stroke="var(--bg)"
        strokeWidth="5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  )
}
