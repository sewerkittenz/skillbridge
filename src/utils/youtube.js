export const searchVideos = async () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_KEY // ✅
  
  if (!API_KEY) {
    throw new Error("API key is missing");
  }


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
    'geography',
    'geopolitics',
  ];

  try {
    const responses = await Promise.all(
      topics.map(topic =>
        fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
            topic
          )}&maxResults=5&type=video&key=${API_KEY}`
        ).then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
      )
    );

    const validVideos = responses.flatMap(response =>
      response.items?.filter(item => item.id?.videoId) || []
    );

    // Remove duplicates
    const uniqueVideos = Array.from(
      new Set(validVideos.map(v => v.id.videoId))
    ).map(id => validVideos.find(v => v.id.videoId === id));

    return uniqueVideos.sort(() => Math.random() - 0.5);
  } catch (error) {
    console.error('YouTube API Error:', error);
    throw new Error('Failed to fetch videos. Check your API key and network connection.');
  }
};
