"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Dashboard = () => {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">KSL</span>
                </div>
                <span className="font-bold text-xl text-gray-800">Kenya Sign Language</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.username}!</span>
              <button
                onClick={logout}
                className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome, {user?.username}!</h1>
          <p className="text-xl text-gray-600">Ready to continue your Kenya Sign Language journey?</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Link to="/learn" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Learn</h3>
              <p className="text-gray-600">
                Explore structured learning units covering alphabets, numbers, words, and phrases.
              </p>
            </div>
          </Link>

          <Link to="/ask-ai" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Ask AI</h3>
              <p className="text-gray-600">
                Get instant translations from text or voice to Kenya Sign Language using AI.
              </p>
            </div>
          </Link>

          <Link to="/profile" className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
            <div className="text-center">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h3>
              <p className="text-gray-600">Track your learning progress and see how much you've improved.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
