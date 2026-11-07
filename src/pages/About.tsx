import { useRef } from 'react'
import '../styles/about.css'
import { Img } from '../components/Img'
import { Lines, useParallax, useReveal, Words } from '../components/Motion'
import { team, values } from '../data/content'
import { useInViewClass } from '../hooks/useInViewClass'

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')

export default function About() {
  const root = useRef<HTMLDivElement>(null)
  const landscape = useParallax<HTMLDivElement>()
  useInViewClass(root, '[data-motion]', 'gp-motion')
  useInViewClass(root, '.words', 'is-in', 0.3)
  useReveal(root)

  return (
    <div id="greuter-atelier" ref={root}>
      <div className="gp-page">
        <div className="gp-split">
          <div>
            <div className="gp-kicker">Über uns · Greifensee</div>
            <h1>
              <Lines>{['Gärten mit Charakter.', <em key="em">Menschen auch.</em>]}</Lines>
            </h1>
          </div>
          <p>
            Wir sind Greuter Gartengestaltung. Seit 2005 gestalten wir persönliche Freiräume – mit natürlichen
            Materialien, lebendigen Pflanzen und Freude am Handwerk.
          </p>
        </div>

        <div className="gp-hero">
          <div className="gp-photo gp-landscape parallax" ref={landscape}>
            <Img src="/assets/home-6.webp" alt="Naturnahe Gartenanlage" loading="eager" fetchPriority="high" />
          </div>
          <span className="gp-stamp">Mit der Natur. Für Ihr Zuhause.</span>
        </div>
        <div className="gp-caption">
          <span>Verwurzelt in Greifensee</span>
          <span>Planen · Gestalten · Pflegen</span>
        </div>

        <section aria-labelledby="team-title">
          <div className="gp-split gp-space">
            <div>
              <div className="gp-kicker">Die Menschen dahinter</div>
              <h2 id="team-title">
                <Words lines={['Persönlich.', 'Von Anfang an.']} />
              </h2>
            </div>
            <p>Wir hören zu, denken mit und packen an. Lernen Sie die Menschen kennen, die Ihren Garten begleiten.</p>
          </div>

          <div className="gp-people">
            {team.map((member, i) => (
              <article className="gp-person" data-motion key={member.name}>
                <div className="gp-photo reveal-img">
                  {member.photo ? (
                    <Img src={member.photo} alt={member.name} sizes="(max-width: 650px) 50vw, 30vw" />
                  ) : (
                    <div className="gp-placeholder" role="img" aria-label={`Porträt von ${member.name} folgt`}>
                      <div>
                        {initials(member.name)}
                        <small>Porträt folgt</small>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <span className="gp-index">
                    {String(i + 1).padStart(2, '0')} / {member.role}
                  </span>
                  <h3 className="gp-person-name">{member.name}</h3>
                  {member.text && <p>{member.text}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gp-statement" data-motion aria-labelledby="values-title">
          <div className="gp-kicker">Unser Anspruch</div>
          <h2 id="values-title">
            <Words lines={['Natürlich gedacht.', 'Persönlich gemacht.']} />
          </h2>
          <div className="gp-values">
            {values.map((v) => (
              <article key={v.number}>
                <span className="gp-index">{v.number}</span>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
