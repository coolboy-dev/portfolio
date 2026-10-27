import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { Header } from './components/Header.jsx'
import { Hero } from './components/Hero.jsx'
import { About, Work, Contact, Footer } from './components/Sections.jsx'
import { prefersReducedMotion } from './hooks.js'
import { site } from './content.js'

export default function App() {
  const [started, setStarted] = useState(false)
  const lenis = useRef(null)

  useEffect(() => {
    // Next frame, so the hero's intro transition has a start state to animate from.
    const id = requestAnimationFrame(() => setStarted(true))
    if (prefersReducedMotion()) return () => cancelAnimationFrame(id)
    const l = new Lenis({ lerp: 0.09 })
    lenis.current = l
    let raf
    const loop = (t) => {
      l.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(id)
      cancelAnimationFrame(raf)
      l.destroy()
      lenis.current = null
    }
  }, [])

  const navigate = (target) => {
    if (lenis.current) lenis.current.scrollTo(target, { offset: 0, duration: 1.4 })
    else if (target === 0) window.scrollTo({ top: 0 })
    else document.querySelector(target)?.scrollIntoView()
  }

  return (
    <>
      <Header onNavigate={navigate} />
      <main id="top">
        <Hero name={site.name} role={site.role} lines={site.heroLines} play={started} />
        <div className="container">
          <About />
          <Work />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  )
}
