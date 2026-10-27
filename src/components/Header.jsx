import { useEffect, useState } from 'react'
import { Logo } from './Logo.jsx'
import { site } from '../content.js'

const links = ['about', 'work', 'contact']

export function Header({ onNavigate }) {
  const [active, setActive] = useState('about')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -45% 0px' },
    )
    links.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    onNavigate(id === 'top' ? 0 : `#${id}`)
  }

  return (
    <header className="header">
      <a href="#top" className="header_logo" aria-label="Back to top" onClick={(e) => go(e, 'top')}>
        <Logo />
      </a>
      <nav>
        <ul className="header_menu">
          {links.map((id) => (
            <li key={id} className={active === id ? 'is-active' : ''}>
              <a href={`#${id}`} onClick={(e) => go(e, id)}>
                <span className="roll">
                  <span>{id}</span>
                  <span aria-hidden="true">{id}</span>
                </span>
              </a>
            </li>
          ))}
          <li>
            <a href={site.resume} download>
              <span className="roll">
                <span>resume</span>
                <span aria-hidden="true">resume</span>
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
