import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  return (
    <section id="about" ref={ref} style={{
      padding: '90px 1rem',
      maxWidth: '1100px',
      margin: '0 auto',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.7rem',
          color: 'var(--cyan)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '0.8rem',
        }}>// Who I Am</span>
        <h2 style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 700,
          fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
          color: '#fff',
          marginBottom: '0.8rem',
        }}>About Me</h2>
        <div style={{
          width: '60px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
          margin: '0 auto',
        }} />
      </motion.div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '2.5rem',
        alignItems: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: '220px', height: '220px' }}>
            {[0, 15, 30].map((inset, i) => (
              <div key={i} style={{
                position: 'absolute',
                inset: `${inset}px`,
                borderRadius: '50%',
                border: `1px solid rgba(0,245,255,${0.2 - i * 0.05})`,
                animation: `rotate ${8 + i * 4}s linear infinite ${i % 2 === 1 ? 'reverse' : 'normal'}`,
              }} />
            ))}
            <div style={{
              position: 'absolute',
              inset: '50px',
              background: 'linear-gradient(135deg, rgba(0,245,255,0.1), rgba(124,58,237,0.1))',
              borderRadius: '50%',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <span style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 900,
                fontSize: '2rem',
                color: 'var(--cyan)',
                textShadow: '0 0 20px var(--cyan)',
                lineHeight: 1,
              }}>AM</span>
              <span style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.55rem',
                color: 'var(--muted)',
                letterSpacing: '0.15em',
              }}>MERN DEV</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}>
          <h3 style={{
            fontFamily: 'Orbitron, monospace',
            fontSize: '1.3rem',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '1rem',
          }}>Building the Future,<br />One Stack at a Time</h3>
          <p style={{
            color: '#94a3b8',
            lineHeight: 1.7,
            fontSize: '0.95rem',
            marginBottom: '1rem',
          }}>
            I'm a passionate Full Stack Developer with deep expertise in the
            MERN stack. From designing scalable REST APIs in Node.js to
            crafting pixel-perfect React UIs, I thrive at every layer of
            the stack.
          </p>
          <p style={{
            color: '#94a3b8',
            lineHeight: 1.7,
            fontSize: '0.95rem',
            marginBottom: '1.5rem',
          }}>
            My approach blends engineering precision with creative
            problem-solving — whether that's architecting a MongoDB schema,
            building real-time features with Socket.io, or optimizing React
            performance with hooks and memoization.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '0.8rem',
          }}>
            {[
              { num: '3+', label: 'Projects' },
              { num: '7+', label: 'Months Exp' },
              { num: 'Interested in', label: 'Real World Problem' },
            ].map((stat) => (
              <div key={stat.label} style={{
                textAlign: 'center',
                padding: '0.8rem',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                background: 'rgba(0,245,255,0.03)',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0, left: 0, right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
                }} />
                <span style={{
                  fontFamily: 'Orbitron, monospace',
                  fontWeight: 700,
                  fontSize: '1.4rem',
                  color: 'var(--cyan)',
                  display: 'block',
                }}>{stat.num}</span>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.6rem',
                  color: 'var(--muted)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}>{stat.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes rotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  )
}

export default About