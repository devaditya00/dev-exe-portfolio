import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useReviews, useSubmitReview } from '../hooks/useReviews.js'

const StarRating = ({ value, onChange }) => {
  const [hovered, setHovered] = useState(0)

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => onChange && onChange(star)}
          onMouseEnter={() => onChange && setHovered(star)}
          onMouseLeave={() => onChange && setHovered(0)}
          style={{
            fontSize: '1.4rem',
            cursor: onChange ? 'pointer' : 'default',
            color: star <= (hovered || value) ? '#f59e0b' : '#374151',
            transition: 'color 0.15s',
          }}>
          ★
        </span>
      ))}
    </div>
  )
}

const Reviews = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const { data, isLoading } = useReviews()
  const { mutate: submitReview, isPending, isSuccess } = useSubmitReview()

  const [form, setForm] = useState({
    name: '', email: '', message: '', rating: 5,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    submitReview(form)
    setForm({ name: '', email: '', message: '', rating: 5 })
  }

  const reviews = data?.data || []

  return (
    <section id="reviews" ref={ref} style={{
      padding: '120px 5%',
      background: 'linear-gradient(to bottom, transparent, rgba(124,58,237,0.03), transparent)',
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
          }}>// What People Say</span>
          <h2 style={{
            fontFamily: 'Orbitron, monospace',
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#fff',
            marginBottom: '1rem',
          }}>Reviews</h2>
          <div style={{
            width: '80px', height: '2px',
            background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)',
            margin: '0 auto',
          }} />
        </motion.div>

        {/* Reviews grid */}
        {isLoading ? (
          <p style={{ textAlign: 'center', color: 'var(--muted)' }}>
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '3rem' }}>
            No reviews yet — be the first!
          </p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '4rem',
          }}>
            {reviews.map((review, i) => (
              <motion.div
                key={review._id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  background: 'var(--bg2)',
                }}>
                <StarRating value={review.rating} />
                <p style={{
                  color: '#94a3b8',
                  lineHeight: 1.7,
                  margin: '1rem 0',
                  fontSize: '0.95rem',
                }}>"{review.message}"</p>
                <div>
                  <span style={{
                    fontFamily: 'Orbitron, monospace',
                    fontSize: '0.8rem',
                    color: 'var(--cyan)',
                  }}>{review.name}</span>
                </div>
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
            maxWidth: '600px',
            margin: '0 auto',
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
          }}>Leave a Review</h3>

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
              ✅ Review submitted! It will appear after approval.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
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
              placeholder="Your review..."
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
                marginBottom: '1rem',
              }}
            />

            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.7rem',
                color: 'var(--muted)',
                marginBottom: '8px',
              }}>Rating</p>
              <StarRating
                value={form.rating}
                onChange={(val) => setForm({ ...form, rating: val })}
              />
            </div>

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
                background: 'var(--cyan)',
                color: '#000',
                border: 'none',
                borderRadius: '4px',
                cursor: isPending ? 'not-allowed' : 'pointer',
                opacity: isPending ? 0.7 : 1,
                transition: 'box-shadow 0.3s',
                width: '100%',
              }}>
              {isPending ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default Reviews