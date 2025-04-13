// src/components/Navbar.jsx
import { Link } from 'react-router-dom'
import { Bars3Icon } from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <nav className="fixed w-full top-0 bg-background/90 backdrop-blur-xl z-50 border-b border-gray-800">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg transform group-hover:rotate-12 transition-all duration-300"></div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
              SkillBridge
            </span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors">
              <Bars3Icon className="h-6 w-6" />
              <span className="font-medium">Queue</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}