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
      padding: '0 1rem',
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(3,7,18,0.9)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : 'none',
      transition: 'all 0.3s',
      flexWrap: 'wrap',
      gap: '0.5rem',
    }}>
      <Link to="/" style={{
        fontFamily: 'Orbitron, monospace',
        fontWeight: 900,
        fontSize: '1.1rem',
        color: 'var(--cyan)',
        textDecoration: 'none',
        textShadow: '0 0 20px var(--cyan)',
        whiteSpace: 'nowrap',
      }}>
        DEV.EXE
      </Link>

      <ul style={{
        display: 'flex',
        gap: '1rem',
        listStyle: 'none',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {['About', 'Stack', 'Projects', 'Reviews', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} style={{
              color: 'var(--muted)',
              textDecoration: 'none',
              fontFamily: 'Space Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
              whiteSpace: 'nowrap',
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
              fontSize: '0.7rem',
              letterSpacing: '0.1em',
              whiteSpace: 'nowrap',
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