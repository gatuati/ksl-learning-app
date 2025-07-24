"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Profile = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold">My Profile</h1>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">{user?.username?.[0]?.toUpperCase()}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome {user?.username}!</h1>
          <p className="text-gray-600">Keep learning sign language!</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-6">Your Progress</h2>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-medium">Overall Progress</span>
              <span className="text-lg font-bold text-indigo-600">{user?.progress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${user?.progress || 0}%` }}></div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 mb-1">26</div>
              <div className="text-sm text-blue-800">Alphabets Available</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600 mb-1">10</div>
              <div className="text-sm text-green-800">Numbers Available</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600 mb-1">50+</div>
              <div className="text-sm text-purple-800">Words & Phrases</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
