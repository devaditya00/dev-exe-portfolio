import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const mernStack = [
  { letter: 'M', name: 'MongoDB', desc: 'NoSQL Database', color: '#43d675' },
  { letter: 'E', name: 'Express', desc: 'Backend Framework', color: '#61dafb' },
  { letter: 'R', name: 'React', desc: 'UI Library', color: '#ff6b6b' },
  { letter: 'N', name: 'Node.js', desc: 'JS Runtime', color: '#68a063' },
]

const skills = [
  { name: 'Mongoose ODM', color: '#43d675' },
  { name: 'React Hooks', color: '#61dafb' },
  { name: 'Redux Toolkit', color: '#764abc' },
  { name: 'REST APIs', color: '#00f5ff' },
  { name: 'JWT / OAuth', color: '#ff6b6b' },
  { name: 'Socket.io', color: '#f39c12' },
  { name: 'Tailwind CSS', color: '#06b6d4' },
  { name: 'Axios', color: '#0080ff' },
  { name: 'Docker', color: '#2496ed' },
  { name: 'Git / GitHub', color: '#f05032' },
  { name: 'Zod Validation', color: '#68a063' },
  { name: 'Vercel / Render', color: '#7c3aed' },
]

const Stack = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <section id="stack" ref={ref} style={{
      padding: '120px 5%',
      background: 'linear-gradient(to bottom, transparent, rgba(0,128,255,0.03), transparent)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem',
            color: 'var(--cyan)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '1rem',
          }}>// My Arsenal</span>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#fff',
            marginBottom: '1rem',
          }}>Tech Stack</h2>
          <div style={{
            width: '80px', height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
            margin: '0 auto',
          }} />
        </motion.div>

        {/* MERN letters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '4rem',
            flexWrap: 'wrap',
          }}>
          {mernStack.map((item, i) => (
            <div key={item.letter}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '2.5rem 3rem',
                border: '1px solid var(--border)',
                borderLeft: i !== 0 ? 'none' : '1px solid var(--border)',
                background: 'rgba(6,13,31,0.8)',
                cursor: 'pointer',
                transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
                borderRadius: i === 0 ? '8px 0 0 8px' : i === 3 ? '0 8px 8px 0' : '0',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-8px)'
                e.currentTarget.style.boxShadow = `0 20px 60px ${item.color}33`
                e.currentTarget.style.borderColor = item.color
                e.currentTarget.style.zIndex = '5'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.borderColor = 'rgba(0,245,255,0.18)'
                e.currentTarget.style.zIndex = '1'
              }}>
              <span style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900,
                fontSize: '4rem',
                lineHeight: 1,
                color: item.color,
                textShadow: `0 0 40px ${item.color}`,
                marginBottom: '0.3rem',
              }}>{item.letter}</span>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.65rem',
                color: 'var(--muted)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}>{item.name}</span>
              <span style={{
                fontSize: '0.8rem',
                color: '#64748b',
                marginTop: '0.5rem',
              }}>{item.desc}</span>
            </div>
          ))}
        </motion.div>

        {/* Skills grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem',
          }}>
          {skills.map((skill) => (
            <div key={skill.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                background: 'rgba(6,13,31,0.6)',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.75rem',
                color: 'var(--text)',
                transition: 'border-color 0.2s, background 0.2s, transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = skill.color
                e.currentTarget.style.background = `${skill.color}11`
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border)'
                e.currentTarget.style.background = 'rgba(6,13,31,0.6)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}>
              <div style={{
                width: '8px', height: '8px',
                borderRadius: '50%',
                background: skill.color,
                flexShrink: 0,
              }} />
              {skill.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Stack