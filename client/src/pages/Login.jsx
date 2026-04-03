import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios.config.js'
import useAuthStore from '../store/authStore.js'

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await api.post('/auth/login', form)
      const { user, accessToken } = res.data.data
      localStorage.setItem('accessToken', accessToken)
      login(user, accessToken)
      navigate('/admin')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '1.8rem',
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

        <h1 style={{
          fontFamily: 'Orbitron, monospace',
          fontWeight: 700,
          fontSize: '1.3rem',
          color: 'var(--cyan)',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}>Admin Login</h1>

        <p style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '0.7rem',
          color: 'var(--muted)',
          textAlign: 'center',
          marginBottom: '1.5rem',
          letterSpacing: '0.08em',
        }}>DEV.EXE CONTROL PANEL</p>

        {error && (
          <div style={{
            padding: '10px',
            background: 'rgba(255,107,107,0.08)',
            border: '1px solid rgba(255,107,107,0.2)',
            borderRadius: '6px',
            color: '#ff6b6b',
            fontFamily: 'Space Mono, monospace',
            fontSize: '0.75rem',
            marginBottom: '1rem',
            textAlign: 'center',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          {['email', 'password'].map((field) => (
            <input
              key={field}
              type={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={e => setForm({ ...form, [field]: e.target.value })}
              required
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
                marginBottom: '0.9rem',
                display: 'block',
              }}
            />
          ))}

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
            }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login