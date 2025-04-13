// src/pages/Home.jsx
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VideoGrid from '../components/VideoGrid'
import { searchVideos } from '../utils/youtube'

export default function Home() {
  const [videos, setVideos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true)
        const results = await searchVideos()
        setVideos(results)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVideos()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20 px-4 md:px-8"
    >
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-red-500 to-purple-500 bg-clip-text text-transparent"
      >
        Expand Your Knowledge
      </motion.h1>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-900/50 p-4 rounded-xl mb-8 space-y-2"
          >
            <div className="font-bold">⚠️ Content Loading Failed</div>
            <div>{error}</div>
            <div className="text-sm opacity-75">
              This might be due to: API limit reached, invalid API key, or network issues
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gray-900 rounded-2xl overflow-hidden"
              >
                <div className="aspect-video bg-gray-800 animate-pulse" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-800 rounded w-3/4 animate-pulse" />
                  <div className="h-3 bg-gray-800 rounded w-1/2 animate-pulse" />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <VideoGrid videos={videos} />
        )}
      </AnimatePresence>

      {!isLoading && videos.length === 0 && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20 text-gray-500"
        >
          No videos found. Try adjusting your search terms.
        </motion.div>
      )}
    </motion.div>
  )
}
