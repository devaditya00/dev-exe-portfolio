const Footer = () => {
  return (
    <footer style={{
      padding: '2rem 5%',
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      zIndex: 2,
    }}>
      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.65rem',
        color: '#64748b',
        letterSpacing: '0.15em',
      }}>
        Built with MERN · Designed for the future · © 2025 Aditya Mishra
      </p>
    </footer>
  )
}

export default Footer