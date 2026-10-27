// A bordered row whose accent band opens from the middle on hover, revealing alternate content.
export function MaskRow({ front, back, className = '' }) {
  return (
    <div className={`mask-row ${className}`} tabIndex={0}>
      <div className="mask-row_front">{front}</div>
      <div className="mask-row_back" aria-hidden="true">{back}</div>
    </div>
  )
}
