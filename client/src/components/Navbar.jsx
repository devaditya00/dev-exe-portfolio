import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore.js'
import LiveCounter from './LiveCounter.jsx'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 100,
      padding: '0 5%',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(3,7,18,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s',
    }}>
      <Link to="/" style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 900,
        fontSize: '1.3rem',
        color: 'var(--cyan)',
        textDecoration: 'none',
        textShadow: '0 0 20px var(--cyan)',
      }}>
        DEV.EXE
      </Link>

      <ul style={{
        display: 'flex',
        gap: '2.5rem',
        listStyle: 'none',
      }}>
        {['About', 'Stack', 'Projects', 'Reviews', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              color: 'var(--muted)',
              textDecoration: 'none',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = 'var(--cyan)'}
            onMouseLeave={e => e.target.style.color = 'var(--muted)'}
            >
              {item}
            </a>
          </li>
        ))}
        {isAuthenticated && (
          <li>
            <Link to="/admin" style={{
              color: 'var(--cyan)',
              textDecoration: 'none',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
            }}>
              Admin
            </Link>
          </li>
        )}
      </ul>
      <LiveCounter />
    </nav>
  )
}

export default Navbar