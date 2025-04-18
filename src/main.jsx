import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { PlaylistProvider } from './contexts/PlaylistContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PlaylistProvider>
      <App />
    </PlaylistProvider>
  </React.StrictMode>
)