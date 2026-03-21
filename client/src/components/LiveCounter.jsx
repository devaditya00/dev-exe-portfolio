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
      gap: '8px',
      fontFamily: 'Space Mono, monospace',
      fontSize: '0.65rem',
      color: 'var(--muted)',
      letterSpacing: '0.1em',
    }}>
      <span style={{
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        background: '#43d675',
        boxShadow: '0 0 8px #43d675',
        animation: 'pulse 1.5s ease infinite',
      }} />
      {visitorCount} online now
    </div>
  )
}

export default LiveCounter