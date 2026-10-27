import { useEffect, useRef } from 'react'
import { MaskRow } from './MaskRow.jsx'
import { ScrollParagraph } from './ScrollParagraph.jsx'
import { useInView } from '../hooks.js'
import { initDemos } from '../demos.js'
import projectsHtml from '../projects.html?raw'
import { about, skills, experience, history, projects, motto, socials, site } from '../content.js'

function Skills() {
  return (
    <div className="block-list">
      <p className="label">What I do</p>
      {skills.map((s) => (
        <MaskRow
          key={s.title}
          front={
            <div className="row">
              <h2 className="h1">{s.title}</h2>
              <p className="desc ghost">{s.desc}</p>
            </div>
          }
          back={
            <div className="row">
              <h2 className="h1">{s.title}</h2>
              <p className="desc">{s.desc}</p>
            </div>
          }
        />
      ))}
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="section">
      <ScrollParagraph label={about.label} lines={about.lines} />
      <Skills />
    </section>
  )
}

// The project write-ups and their demos are plain HTML plus vanilla JS carried over from the old site.
function Projects() {
  const ref = useRef(null)
  useEffect(() => {
    if (ref.current.dataset.ready) return
    ref.current.dataset.ready = '1'
    initDemos()
  }, [])
  return <div className="projects" ref={ref} dangerouslySetInnerHTML={{ __html: projectsHtml }} />
}

export function Work() {
  return (
    <section id="work" className="section">
      <ScrollParagraph label={projects.label} lines={projects.lines} />
      <Projects />

      <div className="spacer" />
      <ScrollParagraph label={experience.label} lines={experience.lines} />
      <div className="block-list">
        <p className="label">History</p>
        {history.map((h) => (
          <MaskRow
            key={h.role}
            className="history"
            front={
              <div className="row row--history">
                <span className="h3 year">{h.year}</span>
                <div>
                  <p className="h3">{h.role}</p>
                  <p className="desc">{h.company}. {h.alt}</p>
                </div>
              </div>
            }
            back={
              <div className="row row--history">
                <span className="h3 year">{h.year}</span>
                <div>
                  <p className="h3">{h.alt}</p>
                  <p className="desc">{h.company}</p>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </section>
  )
}

function Motto() {
  const [ref, inView] = useInView({ threshold: 0.5 })
  let i = 0
  return (
    <div className={`motto${inView ? ' is-in' : ''}`} ref={ref}>
      <p className="label">{motto.label}</p>
      <p className="motto_text h1" aria-label={motto.text}>
        {motto.text.split(' ').map((word, wi) => (
          <span className="word" key={wi} aria-hidden="true">
            {[...word].map((c, ci) => (
              <span className="char" key={ci} style={{ '--i': i++ }}>{c}</span>
            ))}
          </span>
        ))}
      </p>
      <p className="desc motto_credit">— {motto.credit}</p>
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" className="section section--contact">
      <Motto />
      <div className="contact">
        <div className="contact_col">
          <p className="label">Connect</p>
          <ul className="socials">
            {socials.map((s) => (
              <li key={s.name}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  <span className="roll">
                    <span>{s.name}</span>
                    <span aria-hidden="true">{s.name}</span>
                  </span>
                  <span className="desc">{s.note}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="contact_col">
          <p className="label">Email</p>
          <a className="contact_big" href={`mailto:${site.email}`}>{site.email}</a>
          <p className="desc ghost">{site.emailNote}</p>
          <p className="label label--gap">Resume</p>
          <a className="contact_big" href={site.resume} download>Download</a>
          <p className="desc ghost">{site.resumeNote}</p>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer_name" aria-label={site.name}>{site.name}</p>
      <div className="footer_meta">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>Built with React</span>
      </div>
    </footer>
  )
}
