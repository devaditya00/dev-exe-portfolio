const Footer = () => {
  return (
    <footer style={{
      padding: '1.5rem 1rem',
      textAlign: 'center',
      borderTop: '1px solid rgba(255,255,255,0.05)',
      position: 'relative',
      zIndex: 2,
    }}>
      <p style={{
        fontFamily: 'Space Mono, monospace',
        fontSize: '0.75rem',
        color: '#64748b',
        letterSpacing: '0.1em',
        lineHeight: '1.5',
        maxWidth: '600px',
        margin: '0 auto',
        wordBreak: 'break-word',
      }}>
        Built with MERN · Designed for the future · © 2025 Aditya Mishra
      </p>
    </footer>
  )
}

export default Footer