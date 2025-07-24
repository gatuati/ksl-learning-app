"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const Unit3 = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGif, setSelectedGif] = useState(null)

  const phrases = [
    "How are you?",
    "Good morning",
 "Good afternoon",
 "Good evening",
 "Good day",
 "Good night",
 "Good bye",
 "Nice meeting you",
 "Hello"
    
  ]

  const gifLinks = {
    "How are you?": "/gifs/how-are-you.gif",
    "Good morning": "/gifs/good-morning.gif",
    "Good afternoon": "/gifs/good-afternoon.gif",
    "Good evening": "/gifs/good-evening.gif",
    "Good day": "/gifs/good-day.gif",
    "Good night": "/gifs/good-night.gif",
    "Good bye": "/gifs/good-bye.gif",
    "Nice meeting you": "/gifs/nice-meeting-you.gif",
    "Hello": "/gifs/hello.gif"
  }

  const filteredPhrases = phrases.filter((phrase) =>
    phrase.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modal */}
      {selectedGif && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-xl w-full relative">
            <button
              onClick={() => setSelectedGif(null)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
            >
              ✖
            </button>
            <div className="w-full h-auto flex justify-center">
              <img
                src={selectedGif}
                alt="Phrase GIF"
                className="w-full max-h-[500px] object-contain rounded"
              />
            </div>
          </div>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/learn" className="text-indigo-600 hover:text-indigo-800">
              ← Back to Learn
            </Link>
            <h1 className="text-xl font-bold">Unit 3: Phrases</h1>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Unit 3: Common Phrases</h1>

        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Search for phrases..."
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            {filteredPhrases.map((phrase, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100"
              >
                <span className="text-lg font-medium">{phrase}</span>
                <button
                  onClick={() => setSelectedGif(gifLinks[phrase])}
                  className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                >
                  Show GIF
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Unit3
