// Splits each line into characters that rise in with a slight 3D tilt once `play` is true.
export function Hero({ name, role, lines, play }) {
  let index = 0
  return (
    <section className={`hero${play ? ' is-playing' : ''}`}>
      <div className="hero_bg" aria-hidden="true">
        <span className="hero_blob hero_blob--a" />
        <span className="hero_blob hero_blob--b" />
        <span className="hero_grain" />
      </div>
      <div className="hero_content">
        <p className="hero_subtitle">
          <span className="mask"><span>{name} — {role}</span></span>
        </p>
        <h1 aria-label={lines.map((l) => l.replaceAll('*', '')).join(' ')}>
          {lines.map((line, li) => {
            const bold = line.startsWith('*')
            const chars = [...line.replaceAll('*', '')]
            const Tag = bold ? 'strong' : 'span'
            return (
              <span className="hero_line" key={li} aria-hidden="true">
                <Tag>
                  {chars.map((c, ci) => (
                    <span className="char" key={ci} style={{ '--i': index++ }}>
                      {c}
                    </span>
                  ))}
                </Tag>
              </span>
            )
          })}
        </h1>
      </div>
      <a href="#about" className="hero_scroll" aria-label="Scroll down">
        <span />
      </a>
    </section>
  )
}
