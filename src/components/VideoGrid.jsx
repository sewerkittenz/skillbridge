import { usePlaylist } from '../contexts/PlaylistContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function VideoGrid({ videos }) {
  const { addToQueue, setCurrentVideo } = usePlaylist();
  const navigate = useNavigate();

  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    addToQueue(video);
    navigate('/watch'); // This is better than using window.location.href
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {videos.map((video) => (
        <motion.div
          key={video.id.videoId}
          onClick={() => handleVideoClick(video)}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="group relative cursor-pointer bg-gray-900 rounded-2xl overflow-hidden"
        >
          <div className="relative aspect-video">
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-lg line-clamp-2">
              {video.snippet.title}
            </h3>
            <p className="text-gray-400 text-sm line-clamp-2">
              {video.snippet.channelTitle}
            </p>
            <div className="flex items-center text-xs text-gray-500 space-x-2">
              <span className="bg-gray-800 px-2 py-1 rounded-md">
                {video.topic?.split(' ')[0]}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

