import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import api from '../api/axios.config.js'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: '',
  })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" ref={ref} style={{
      padding: '90px 1rem',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: '2rem' }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.7rem',
            color: 'var(--cyan)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '0.8rem',
          }}>// Let's Build</span>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: 'clamp(1.6rem, 5vw, 2.5rem)',
            color: '#fff',
            marginBottom: '0.8rem',
          }}>Get in Touch</h2>
          <div style={{
            width: '60px', height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
            margin: '0 auto 1rem',
          }} />
          <p style={{
            color: '#64748b',
            fontSize: '0.95rem',
            lineHeight: 1.6,
          }}>
            Open to freelance projects, collaborations, and full-time
            opportunities. Got an idea? Let's bring it to life.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            padding: '1.5rem',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            background: 'var(--bg2)',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'left',
          }}>
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
          }} />

          {status === 'success' && (
            <div style={{
              padding: '10px',
              background: 'rgba(0,245,255,0.08)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              color: 'var(--cyan)',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              marginBottom: '1rem',
            }}>
              ✅ Message sent! I'll get back to you soon.
            </div>
          )}

          {status === 'error' && (
            <div style={{
              padding: '10px',
              background: 'rgba(255,107,107,0.08)',
              border: '1px solid rgba(255,107,107,0.2)',
              borderRadius: '6px',
              color: '#ff6b6b',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              marginBottom: '1rem',
            }}>
              ❌ Something went wrong. Try again.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '0.8rem',
              marginBottom: '1rem',
            }}>
              {['name', 'email'].map((field) => (
                <input
                  key={field}
                  type={field === 'email' ? 'email' : 'text'}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={e => setForm({ ...form, [field]: e.target.value })}
                  required
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border)',
                    borderRadius: '6px',
                    padding: '12px 14px',
                    color: '#e2e8f0',
                    fontFamily: 'Rajdhani, sans-serif',
                    fontSize: '0.95rem',
                    outline: 'none',
                    width: '100%',
                  }}
                />
              ))}
            </div>

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              required
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '12px 14px',
                color: '#e2e8f0',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '0.95rem',
                outline: 'none',
                width: '100%',
                marginBottom: '1rem',
              }}
            />

            <textarea
              placeholder="Your message..."
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                padding: '12px 14px',
                color: '#e2e8f0',
                fontFamily: 'Rajdhani, sans-serif',
                fontSize: '0.95rem',
                outline: 'none',
                resize: 'vertical',
                marginBottom: '1.2rem',
              }}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                fontFamily: 'Orbitron, monospace',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '12px 20px',
                background: 'var(--cyan)',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                width: '100%',
                transition: 'box-shadow 0.3s',
              }}>
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            display: 'flex',
            gap: '0.6rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '1.5rem',
          }}>
          {['GitHub', 'LinkedIn', 'Twitter', 'Resume ↓'].map((link) => (
            <a key={link} href="#" style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              padding: '8px 14px',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              color: 'var(--muted)',
              textDecoration: 'none',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--cyan)'
              e.currentTarget.style.borderColor = 'var(--cyan)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--muted)'
              e.currentTarget.style.borderColor = 'var(--border)'
            }}>
              {link}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Contact