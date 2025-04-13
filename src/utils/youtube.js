export const searchVideos = async () => {
  const topics = [
    'classical physics',
    'programming',
    'history',
    'politics',
    'technology',
    'kanji',
    'japanese vocabulary',
    'japanese grammar',
    'quantum physics',
    'debate',
    'science',
    'economics',
    'news',
    'philippine news',
    'japanese news',
  ];

  try {
    const responses = await Promise.all(
      topics.map(topic => 
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(topic)}&maxResults=5&type=video&key=${import.meta.env.VITE_YOUTUBE_KEY}&videoDuration=medium`)
          .then(res => {
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            return res.json()
          })
      )
    );

    const validVideos = responses.flatMap(response => 
      response.items?.filter(item => item.id?.videoId) || []
    );

    // Remove duplicates
    const uniqueVideos = Array.from(new Set(validVideos.map(v => v.id.videoId)))
      .map(id => validVideos.find(v => v.id.videoId === id));

    return uniqueVideos.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw new Error('Failed to fetch videos. Check your API key and network connection.');
  }
};