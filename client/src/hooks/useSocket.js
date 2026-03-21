import { useEffect } from 'react'
import { io } from 'socket.io-client'
import useUiStore from '../store/uiStore.js'

let socket

export const useSocket = () => {
  const setVisitorCount = useUiStore((state) => state.setVisitorCount)

  useEffect(() => {
    socket = io(import.meta.env.VITE_SOCKET_URL)

    socket.on('visitorCount', (count) => {
      setVisitorCount(count)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return socket
}

export default useSocket