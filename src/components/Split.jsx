import { useInView } from '../motion.js'

// A heading whose words rise out of their own line, one after another, when it comes into view.
export default function Split({ as: Tag = 'h2', text, className = '', delay = 0, id }) {
  const ref = useInView()
  const words = text.split(' ')
  return (
    <Tag ref={ref} id={id} className={`split ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span className="w" key={i} aria-hidden="true">
          <span style={{ transitionDelay: `${delay + i * 70}ms` }}>{w}</span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}
