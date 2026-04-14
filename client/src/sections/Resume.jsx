import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'

const experiences = [
  {
    role: 'Full Stack Developer',
    company: 'Freelance',
    period: '2025 - Present',
    desc: 'Building production MERN apps for clients.',
  },
  {
    role: 'Tech Core Team Member',
    Society: 'Society Projects',
    period: 'Aug 2025 - Present',
    desc: 'Developed React apps with REST API integrations.',
  },
]

const education = [
  {
    degree: 'B.Tech Computer Science',
    school: 'Your University',
    period: '2021 - 2025',
    desc: 'Web Development, Machine Learning, DBMS, Data Structures.',
  },
]

const Resume = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <section id="resume" ref={ref} style={{
      padding: '120px 5%',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

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
          }}>My Journey</span>

          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '3rem',
            color: '#fff',
            marginBottom: '1rem',
          }}>Resume</h2>

          <div style={{
            width: '80px',
            height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
            margin: '0 auto 2rem',
          }} />

          <button
            onClick={() => window.open('/Aditya_Mishra_Resume.pdf')}
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              background: 'var(--cyan)',
              color: '#000',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            Download Resume
          </button>
          
   
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
        }}>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}>

            <h3 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '1rem',
              color: 'var(--cyan)',
              marginBottom: '2rem',
            }}>Experience</h3>

            {experiences.map((exp, i) => (
              <div key={i} style={{
                paddingLeft: '1.5rem',
                marginBottom: '2rem',
                borderLeft: '1px solid var(--border)',
                position: 'relative',
              }}>
                <h4 style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.85rem',
                  color: '#fff',
                  marginBottom: '0.3rem',
                }}>{exp.role}</h4>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  color: 'var(--cyan)',
                  display: 'block',
                  marginBottom: '0.3rem',
                }}>{exp.company}</span>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.65rem',
                  color: 'var(--muted)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>{exp.period}</span>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}>{exp.desc}</p>
              </div>
            ))}

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}>

            <h3 style={{
              fontFamily: 'Orbitron, monospace',
              fontSize: '1rem',
              color: 'var(--cyan)',
              marginBottom: '2rem',
            }}>Education</h3>

            {education.map((edu, i) => (
              <div key={i} style={{
                paddingLeft: '1.5rem',
                marginBottom: '2rem',
                borderLeft: '1px solid var(--border)',
                position: 'relative',
              }}>
                <h4 style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.85rem',
                  color: '#fff',
                  marginBottom: '0.3rem',
                }}>{edu.degree}</h4>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  color: 'var(--cyan)',
                  display: 'block',
                  marginBottom: '0.3rem',
                }}>{edu.school}</span>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.65rem',
                  color: 'var(--muted)',
                  display: 'block',
                  marginBottom: '0.5rem',
                }}>{edu.period}</span>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.9rem',
                  lineHeight: 1.6,
                }}>{edu.desc}</p>
              </div>
            ))}

          </motion.div>

        </div>
      </div>
    </section>
  )
}

export default Resume