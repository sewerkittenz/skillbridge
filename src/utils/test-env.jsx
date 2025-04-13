export const EnvTest = () => {
    return (
      <div>
        <h2>Environment Variables Test</h2>
        <p>VITE_YOUTUBE_KEY: {import.meta.env.VITE_YOUTUBE_KEY ? '✅ Loaded' : '❌ Missing'}</p>
      </div>
    )
  }