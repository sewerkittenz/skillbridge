// src/contexts/PlaylistContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'

const PlaylistContext = createContext()

export function PlaylistProvider({ children }) {
  const [queue, setQueue] = useState(() => {
    const localData = localStorage.getItem('skillbridgeQueue')
    return localData ? JSON.parse(localData) : []
  })

  const [currentVideo, setCurrentVideo] = useState(() => {
    const localVideo = localStorage.getItem('skillbridgeCurrentVideo')
    return localVideo ? JSON.parse(localVideo) : null
  })

  useEffect(() => {
    localStorage.setItem('skillbridgeQueue', JSON.stringify(queue))
    localStorage.setItem('skillbridgeCurrentVideo', JSON.stringify(currentVideo))
  }, [queue, currentVideo])

  const addToQueue = (video) => {
    setQueue(prev => [...prev, video])
  }

  const playNext = () => {
    setQueue(prev => prev.slice(1))
    setCurrentVideo(prev => (prev ? prev : queue[0]))
  }

  return (
    <PlaylistContext.Provider
      value={{
        queue,
        currentVideo,
        addToQueue,
        playNext,
        setCurrentVideo
      }}
    >
      {children}
    </PlaylistContext.Provider>
  )
}

export const usePlaylist = () => useContext(PlaylistContext)
