import { useRef } from 'react'
import { useScrollProgress } from '../hooks.js'
import { Rich } from '../rich.jsx'

// A dimmed copy sits behind; the bright copy is wiped in line by line as you scroll.
export function ScrollParagraph({ label, lines }) {
  const lineRefs = useRef([])
  const ref = useScrollProgress((p) => {
    const n = lines.length
    lineRefs.current.forEach((el, i) => {
      if (!el) return
      const local = Math.min(1, Math.max(0, p * n - i))
      el.style.setProperty('--size', `${(1 - local) * 100}%`)
    })
  })

  return (
    <div className="block">
      <p className="label">{label}</p>
      <div className="scroll-paragraph h2" ref={ref}>
        <div className="scroll-paragraph_bg" aria-hidden="true">
          {lines.map((l, i) => (
            <span className="line" key={i}><Rich text={l} /></span>
          ))}
        </div>
        <div className="scroll-paragraph_fg">
          {lines.map((l, i) => (
            <span className="line" key={i} ref={(el) => (lineRefs.current[i] = el)}>
              <Rich text={l} />{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
