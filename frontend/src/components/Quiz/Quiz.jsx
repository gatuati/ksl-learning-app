"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false)

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link to="/learn" className="text-indigo-600 hover:text-indigo-800">
                ← Back to Learn
              </Link>
              <h1 className="text-xl font-bold">Quiz</h1>
              <div></div>
            </div>
          </div>
        </nav>

        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Kenya Sign Language Quiz</h1>
            <p className="text-gray-600 mb-8">Test your knowledge of sign language</p>
            <button
              onClick={() => setQuizStarted(true)}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/learn" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Learn
            </Link>
            <h1 className="text-xl font-bold">Quiz</h1>
            <div></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold mb-4">Question 1 of 10</h2>
          <p className="text-lg mb-6">What does this sign mean?</p>

          <div className="space-y-3 mb-6">
            <button className="w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50">A) Hello</button>
            <button className="w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50">
              B) Thank you
            </button>
            <button className="w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50">C) Goodbye</button>
            <button className="w-full text-left p-3 border border-gray-300 rounded hover:bg-gray-50">D) Please</button>
          </div>

          <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">Next Question</button>
        </div>
      </div>
    </div>
  )
}

export default Quiz
