import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const projects = [
  {
    num: '01',
    title: 'DevConnect',
    desc: 'A full-stack developer social network with real-time chat, post feeds, and profile management. Built with JWT auth and Socket.io for live messaging.',
    tags: [
      { name: 'React', color: '#ff6b6b' },
      { name: 'Node.js', color: '#68a063' },
      { name: 'MongoDB', color: '#43d675' },
      { name: 'Socket.io', color: '#00f5ff' },
    ],
  },
  {
    num: '02',
    title: 'ShopFlow',
    desc: 'E-commerce platform with product catalog, cart management, Stripe payment integration, and admin dashboard for inventory management.',
    tags: [
      { name: 'React', color: '#ff6b6b' },
      { name: 'Express', color: '#61dafb' },
      { name: 'MongoDB', color: '#43d675' },
      { name: 'Stripe', color: '#00f5ff' },
    ],
  },
  {
    num: '03',
    title: 'TaskForge',
    desc: 'Kanban-style project management tool with drag-and-drop boards, team collaboration, deadline tracking, and role-based access control.',
    tags: [
      { name: 'React', color: '#ff6b6b' },
      { name: 'Node.js', color: '#68a063' },
      { name: 'MongoDB', color: '#43d675' },
      { name: 'Redux', color: '#764abc' },
    ],
  },
  {
    num: '04',
    title: 'BlogVerse',
    desc: 'A feature-rich blogging platform with rich text editing, tag-based filtering, comment threads, user authentication, and SEO-optimized rendering.',
    tags: [
      { name: 'React', color: '#ff6b6b' },
      { name: 'Express', color: '#61dafb' },
      { name: 'MongoDB', color: '#43d675' },
      { name: 'JWT', color: '#00f5ff' },
    ],
  },
  {
    num: '05',
    title: 'AuthKit',
    desc: 'Reusable authentication microservice with OAuth 2.0, email verification, password reset, refresh token rotation, and rate limiting.',
    tags: [
      { name: 'Node.js', color: '#68a063' },
      { name: 'Express', color: '#61dafb' },
      { name: 'MongoDB', color: '#43d675' },
      { name: 'OAuth', color: '#00f5ff' },
    ],
  },
  {
    num: '06',
    title: 'PriceTrackr',
    desc: 'Web scraper + dashboard that monitors product prices across e-commerce sites and sends email/push alerts when prices drop below threshold.',
    tags: [
      { name: 'Node.js', color: '#68a063' },
      { name: 'React', color: '#ff6b6b' },
      { name: 'MongoDB', color: '#43d675' },
      { name: 'Cron', color: '#00f5ff' },
    ],
  },
]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <section id="projects" ref={ref} style={{
      padding: '120px 5%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
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
        }}>// What I've Built</span>
        <h2 style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#fff',
          marginBottom: '1rem',
        }}>Projects</h2>
        <div style={{
          width: '80px', height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
          margin: '0 auto',
        }} />
      </motion.div>

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1.5rem',
      }}>
        {projects.map((project, i) => (
          <motion.div
            key={project.num}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            style={{
              border: '1px solid var(--border)',
              borderRadius: '10px',
              background: 'var(--bg2)',
              overflow: 'hidden',
              transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
              cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-8px)'
              e.currentTarget.style.boxShadow = '0 30px 80px rgba(0,245,255,0.12)'
              e.currentTarget.style.borderColor = 'rgba(0,245,255,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}>

            {/* Card header */}
            <div style={{
              padding: '1.5rem 1.5rem 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}>
              <span style={{
                fontFamily: 'Orbitron, monospace',
                fontSize: '0.7rem',
                color: 'var(--cyan)',
                opacity: 0.5,
              }}>{project.num}</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['GH', '↗'].map((link) => (
                  <a key={link} href="#" style={{
                    width: '32px', height: '32px',
                    border: '1px solid var(--border)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    fontSize: '0.75rem',
                    fontFamily: 'Space Mono, monospace',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--cyan)'
                    e.currentTarget.style.borderColor = 'var(--cyan)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                  }}>{link}</a>
                ))}
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: '1.2rem 1.5rem 1.5rem' }}>
              <h3 style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 700,
                fontSize: '1.1rem',
                color: '#fff',
                marginBottom: '0.6rem',
              }}>{project.title}</h3>
              <p style={{
                color: '#64748b',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                marginBottom: '1.2rem',
              }}>{project.desc}</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {project.tags.map((tag) => (
                  <span key={tag.name} style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: '0.65rem',
                    padding: '4px 10px',
                    borderRadius: '100px',
                    background: `${tag.color}18`,
                    color: tag.color,
                    border: `1px solid ${tag.color}33`,
                  }}>{tag.name}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default Projects