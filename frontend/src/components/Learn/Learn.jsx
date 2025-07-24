"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const Learn = () => {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Dashboard
            </Link>
            <h1 className="text-xl font-bold">Learn</h1>
            <button onClick={logout} className="text-red-600 hover:text-red-800">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Learn Kenya Sign Language</h1>

        <div className="grid md:grid-cols-3 gap-6">
          <Link to="/learn/unit1" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-bold mb-2">Unit 1: Basics</h2>
            <p className="text-gray-600">Learn alphabets and numbers</p>
          </Link>

          <Link to="/learn/unit2" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-bold mb-2">Unit 2: Words</h2>
            <p className="text-gray-600">Common words and expressions</p>
          </Link>

          <Link to="/learn/unit3" className="bg-white p-6 rounded-lg shadow hover:shadow-lg">
            <h2 className="text-xl font-bold mb-2">Unit 3: Phrases</h2>
            <p className="text-gray-600">Complete phrases and conversations</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Learn
