import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '100px 5% 60px',
      position: 'relative',
    }}>
      {/* Grid background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '900px', position: 'relative', zIndex: 1 }}>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem',
            color: 'var(--cyan)',
            border: '1px solid var(--border)',
            padding: '6px 16px',
            borderRadius: '100px',
            marginBottom: '2.5rem',
            background: 'rgba(0,245,255,0.04)',
            letterSpacing: '0.2em',
          }}>
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--cyan)',
            animation: 'pulse 1.5s ease infinite',
          }} />
          Available for Work · MERN Developer
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 900,
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 1,
            marginBottom: '0.4em',
          }}>
          <span style={{ display: 'block', color: '#fff' }}>Hello, I'm</span>
          <span style={{
            display: 'block',
            background: 'linear-gradient(90deg, #00f5ff, #0080ff, #7c3aed)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            Aditya Mishra
          </span>
        </motion.h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 'clamp(0.8rem, 2vw, 1rem)',
            color: 'var(--muted)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
          Full Stack MERN Developer · Builder of the Web
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{
            fontSize: '1.2rem',
            lineHeight: 1.7,
            color: '#94a3b8',
            maxWidth: '600px',
            margin: '0 auto 3rem',
          }}>
          I craft high-performance web applications using MongoDB, Express,
          React, and Node.js — turning complex ideas into clean, scalable
          digital products.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#projects" style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '14px 32px',
            background: 'var(--cyan)',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'box-shadow 0.3s, transform 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.boxShadow = '0 0 40px rgba(0,245,255,0.6)'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.target.style.boxShadow = 'none'
            e.target.style.transform = 'translateY(0)'
          }}>
            View Projects
          </a>
          <a href="#contact" style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            padding: '13px 32px',
            background: 'transparent',
            color: 'var(--cyan)',
            border: '1px solid var(--border)',
            borderRadius: '4px',
            textDecoration: 'none',
            transition: 'background 0.3s, transform 0.2s',
          }}
          onMouseEnter={e => {
            e.target.style.background = 'rgba(0,245,255,0.06)'
            e.target.style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            e.target.style.background = 'transparent'
            e.target.style.transform = 'translateY(0)'
          }}>
            Get in Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{
          width: '1px',
          height: '50px',
          background: 'linear-gradient(to bottom, var(--cyan), transparent)',
          animation: 'scrollLine 2s ease-in-out infinite',
        }} />
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.65rem',
          color: 'var(--muted)',
          letterSpacing: '0.2em',
        }}>SCROLL</span>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0,245,255,0.7); }
          70% { box-shadow: 0 0 0 8px rgba(0,245,255,0); }
        }
        @keyframes scrollLine {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
      `}</style>
    </section>
  )
}

export default Hero