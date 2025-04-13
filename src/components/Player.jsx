// src/components/Player.jsx
import { useEffect, useRef } from 'react';
import { usePlaylist } from '../contexts/PlaylistContext';

export default function Player() {
  const { currentVideo, playNext } = usePlaylist();
  const playerRef = useRef(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      document.body.appendChild(tag);
    };

    if (!window.YT) {
      loadYouTubeAPI();
    } else {
      initializePlayer();
    }

    window.onYouTubeIframeAPIReady = initializePlayer;

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (playerRef.current && currentVideo) {
      playerRef.current.loadVideoById(currentVideo.id.videoId);
    }
  }, [currentVideo]);

  const initializePlayer = () => {
    if (!currentVideo) return;
    
    playerRef.current = new window.YT.Player('player', {
      height: '100%',
      width: '100%',
      videoId: currentVideo.id.videoId,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        rel: 0
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  };

  const onPlayerReady = (event) => {
    event.target.playVideo();
  };

  const onPlayerStateChange = (event) => {
    if (event.data === window.YT.PlayerState.ENDED) {
      playNext();
    }
  };

  return (
    <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
      {currentVideo ? (
        <div id="player" />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-gray-500">
          Select a video from the list
        </div>
      )}
    </div>
  );
}