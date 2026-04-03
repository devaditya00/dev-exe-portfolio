import { useEffect } from 'react'
import useSocket from '../hooks/useSocket.js'
import useUiStore from '../store/uiStore.js'

const LiveCounter = () => {
  useSocket()
  const visitorCount = useUiStore((state) => state.visitorCount)

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'Space Mono, monospace',
      fontSize: '0.75rem',
      color: 'var(--muted)',
      letterSpacing: '0.08em',
      flexWrap: 'wrap',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#43d675',
        boxShadow: '0 0 6px #43d675',
        animation: 'pulse 1.5s ease infinite',
        flexShrink: 0,
      }} />
      {visitorCount} online now
    </div>
  )
}

export default LiveCounter