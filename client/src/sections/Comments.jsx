import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useComments, useSubmitComment } from '../hooks/useComments.js'

const Comments = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const { data, isLoading } = useComments()
  const { mutate: submitComment, isPending, isSuccess } = useSubmitComment()

  const [form, setForm] = useState({
    name: '', email: '', message: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    submitComment(form)
    setForm({ name: '', email: '', message: '' })
  }

  const comments = data?.data || []

  return (
    <section id="comments" ref={ref} style={{
      padding: '120px 5%',
      maxWidth: '900px',
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
        }}>// Join the Conversation</span>
        <h2 style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 700,
          fontSize: 'clamp(1.8rem, 4vw, 3rem)',
          color: '#fff',
          marginBottom: '1rem',
        }}>Comments</h2>
        <div style={{
          width: '80px', height: '2px',
          background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
          margin: '0 auto',
        }} />
      </motion.div>

      {/* Comments list */}
      {isLoading ? (
        <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
          Loading comments...
        </p>
      ) : comments.length === 0 ? (
        <p style={{
          textAlign: 'center',
          color: 'var(--muted)',
          marginBottom: '3rem',
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.8rem',
        }}>
          No comments yet — start the conversation!
        </p>
      ) : (
        <div style={{ marginBottom: '3rem' }}>
          {comments.map((comment, i) => (
            <motion.div
              key={comment._id}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{
                padding: '1.2rem 1.5rem',
                border: '1px solid var(--border)',
                borderLeft: '3px solid var(--cyan)',
                borderRadius: '0 8px 8px 0',
                background: 'var(--bg2)',
                marginBottom: '1rem',
              }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.5rem',
              }}>
                <span style={{
                  fontFamily: 'Orbitron, monospace',
                  fontSize: '0.8rem',
                  color: 'var(--cyan)',
                }}>{comment.name}</span>
                <span style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.65rem',
                  color: 'var(--muted)',
                }}>
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p style={{
                color: '#94a3b8',
                fontSize: '0.95rem',
                lineHeight: 1.6,
              }}>{comment.message}</p>
            </motion.div>
          ))}
        </div>
      )}

      {/* Submit form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          padding: '2.5rem',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--bg2)',
          position: 'relative',
          overflow: 'hidden',
        }}>
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
        }} />

        <h3 style={{
          fontFamily: 'Orbitron, monospace',
          fontSize: '1.1rem',
          color: '#fff',
          marginBottom: '1.5rem',
        }}>Leave a Comment</h3>

        {isSuccess && (
          <div style={{
            padding: '12px',
            background: 'rgba(0,245,255,0.08)',
            border: '1px solid var(--border)',
            borderRadius: '6px',
            color: 'var(--cyan)',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.8rem',
            marginBottom: '1rem',
          }}>
            ✅ Comment submitted! It will appear after approval.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem',
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
                  padding: '12px 16px',
                  color: '#e2e8f0',
                  fontFamily: 'Rajdhani, sans-serif',
                  fontSize: '1rem',
                  outline: 'none',
                  width: '100%',
                }}
              />
            ))}
          </div>

          <textarea
            placeholder="Your comment..."
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            required
            rows={4}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border)',
              borderRadius: '6px',
              padding: '12px 16px',
              color: '#e2e8f0',
              fontFamily: 'Rajdhani, sans-serif',
              fontSize: '1rem',
              outline: 'none',
              resize: 'vertical',
              marginBottom: '1.5rem',
            }}
          />

          <button
            type="submit"
            disabled={isPending}
            style={{
              fontFamily: 'Orbitron, monospace',
              fontWeight: 700,
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              padding: '14px 32px',
              background: 'transparent',
              color: 'var(--cyan)',
              border: '1px solid var(--border)',
              borderRadius: '4px',
              cursor: isPending ? 'not-allowed' : 'pointer',
              opacity: isPending ? 0.7 : 1,
              transition: 'background 0.3s',
              width: '100%',
            }}>
            {isPending ? 'Submitting...' : 'Post Comment'}
          </button>
        </form>
      </motion.div>
    </section>
  )
}

export default Comments