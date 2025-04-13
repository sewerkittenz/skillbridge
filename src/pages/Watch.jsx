import { useEffect } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';
import Player from '../components/Player';

export default function Watch() {
  const { currentVideo, queue } = usePlaylist();

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.code === 'Space') {
        const iframe = document.querySelector('#player');
        if (iframe) {
          const player = iframe.getElementsByTagName('iframe')[0]?.contentWindow;
          player?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="pt-20 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Player Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            {currentVideo ? (
              <Player />
            ) : (
              <div className="aspect-video bg-gray-800 flex items-center justify-center">
                <p className="text-gray-500">Select a video to start playing</p>
              </div>
            )}
          </div>
          
          {currentVideo && (
            <div className="bg-gray-900 p-6 rounded-2xl space-y-4">
              <h1 className="text-2xl font-bold">{currentVideo.snippet.title}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-red-500">▶</span>
                  <p className="text-gray-400">{currentVideo.snippet.channelTitle}</p>
                </div>
              </div>
              <p className="text-gray-300 leading-relaxed">
                {currentVideo.snippet.description}
              </p>
            </div>
          )}
        </div>

        {/* Queue Sidebar */}
        <div className="bg-gray-900 rounded-2xl p-6 h-fit lg:sticky lg:top-24 space-y-4">
          <h2 className="text-xl font-bold">Up Next</h2>
          {queue.length > 0 ? (
            <div className="space-y-4">
              {queue.map((video, index) => (
                <div
                  key={video.id.videoId + index}
                  className="flex gap-4 cursor-pointer hover:bg-gray-800 p-3 rounded-xl transition-colors"
                >
                  <div className="w-32 flex-shrink-0 aspect-video bg-gray-800 rounded-lg overflow-hidden">
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt={video.snippet.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium line-clamp-2">{video.snippet.title}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {video.snippet.channelTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-500">Add videos to your queue</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
