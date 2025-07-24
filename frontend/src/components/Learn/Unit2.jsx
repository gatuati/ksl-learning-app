"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const Unit2 = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedGif, setSelectedGif] = useState(null)

  const words = [
    "Please", "Sorry", "Yes", "No",
    "Happy", "Sad",
    "Home", "School", "Work",
  ]

  const gifLinks = {
    "Please": "/gifs/please.gif",
    "Sorry": "/gifs/sorry.gif",
    "Yes": "/gifs/yes.gif",
    "No": "/gifs/no.gif",
    "Happy": "/gifs/happy.gif",
    "Sad": "/gifs/sad.gif",
    "Home": "/gifs/home.gif",
    "School": "/gifs/school.gif",
    "Work": "/gifs/work.gif",
  }

  const filteredWords = words.filter((word) =>
    word.toLowerCase().includes(searchTerm.toLowerCase())
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
                alt="Sign GIF"
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
            <h1 className="text-xl font-bold">Unit 2: Words</h1>
            <div></div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Unit 2: Common Words</h1>

        <div className="mb-8">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
            placeholder="Search for words..."
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="space-y-4">
            {filteredWords.map((word, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded hover:bg-gray-100"
              >
                <span className="text-lg font-medium">{word}</span>
                <button
                  onClick={() => setSelectedGif(gifLinks[word])}
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

export default Unit2
