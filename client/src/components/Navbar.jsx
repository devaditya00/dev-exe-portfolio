import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/authStore.js'
import LiveCounter from './LiveCounter.jsx'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const { isAuthenticated } = useAuthStore()

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = ['About', 'Stack', 'Projects', 'Reviews', 'Contact']

  return (
    <>
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
      }}>

       <div style={{
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  lineHeight: '1.2'
}}>
  <Link to="/" style={{
    fontFamily: 'Orbitron, monospace',
    fontWeight: 900,
    fontSize: '1.1rem',
    color: 'var(--cyan)',
    textDecoration: 'none',
    textShadow: '0 0 20px var(--cyan)',
  }}>
    DEV.EXE
  </Link>
  <LiveCounter />
</div>

        {/* Hamburger Button (Mobile only) */}
        {isMobile && (
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--cyan)',
            }}
          >
            {menuOpen ? '✕' : '☰'}
          </div>
        )}

        {/* Nav Links */}
        <ul style={{
          display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          position: isMobile ? 'absolute' : 'static',
          top: '60px',
          right: 0,
          width: isMobile ? '200px' : 'auto',
          background: isMobile ? '#111' : 'transparent',
          padding: isMobile ? '1rem' : '0',
          gap: '1rem',
          listStyle: 'none',
          borderRadius: isMobile ? '8px' : '0',
        }}>
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
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
              <Link
                to="/admin"
                onClick={() => setMenuOpen(false)}
                style={{
                  color: 'var(--cyan)',
                  textDecoration: 'none',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                }}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>
      </nav>

       
      
    </>
  )
}

export default Navbar