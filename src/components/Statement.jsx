import { useScrollVar } from '../motion.js'

// A sentence that lights up word by word as the visitor scrolls past it.
export default function Statement({ text }) {
  const ref = useScrollVar('through', '--p')
  const words = text.split(' ')
  return (
    <section className="statement" aria-label="About SAYBS">
      <div className="wrap">
        <p ref={ref} style={{ '--n': words.length }} aria-label={text}>
          {words.map((w, i) => (
            <span key={i} style={{ '--i': i }} aria-hidden="true">{w} </span>
          ))}
        </p>
      </div>
    </section>
  )
}
