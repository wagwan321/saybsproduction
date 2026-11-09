import { useScrollVar, useInView } from '../motion.js'
import { PROCESS } from '../data.js'

function Step({ s, i }) {
  const ref = useInView({ rootMargin: '0px 0px -30% 0px' })
  return (
    <li ref={ref} className="step">
      <span className="step-dot" aria-hidden="true" />
      <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
      <h3 className="h-title">{s.title}</h3>
      <p className="body">{s.text}</p>
    </li>
  )
}

// How booking works: a single line draws down the steps as the visitor reads them.
export default function Process() {
  const ref = useScrollVar('through', '--p')
  return (
    <section className="process" aria-labelledby="how">
      <div className="wrap process-grid">
        <div className="process-head">
          <h2 id="how" className="h-display">From first message to final film</h2>
        </div>
        <ol ref={ref} className="steps">
          <span className="steps-line" aria-hidden="true" />
          {PROCESS.map((s, i) => <Step key={s.title} s={s} i={i} />)}
        </ol>
      </div>
    </section>
  )
}
