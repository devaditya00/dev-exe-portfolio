import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useProjects } from '../hooks/useProjects.js'

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{
        border: '1px solid var(--border)',
        borderRadius: '10px',
        background: 'var(--bg2)',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative',
        transition: 'transform 0.3s, box-shadow 0.3s, border-color 0.3s',
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
        }}>{String(index + 1).padStart(2, '0')}</span>
        <div style={{ display: 'flex', gap: '10px' }}>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" style={{
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
            }}>GH</a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" style={{
              width: '32px', height: '32px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--muted)',
              textDecoration: 'none',
              fontSize: '0.75rem',
            }}>↗</a>
          )}
        </div>
      </div>

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
        }}>{project.description}</p>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {project.techStack?.map((tech) => (
            <span key={tech} style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.65rem',
              padding: '4px 10px',
              borderRadius: '100px',
              background: 'rgba(0,245,255,0.08)',
              color: 'var(--cyan)',
              border: '1px solid var(--border)',
            }}>{tech}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const { data, isLoading } = useProjects()
  const projects = data?.data || []

  return (
    <section id="projects" ref={ref} style={{
      padding: '120px 5%',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
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

      {isLoading ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontFamily: 'Space Mono, monospace' }}>
          Loading projects...
        </p>
      ) : projects.length === 0 ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)', fontFamily: 'Space Mono, monospace' }}>
          No projects yet — add some from the admin dashboard!
        </p>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project._id} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  )
}

export default Projects