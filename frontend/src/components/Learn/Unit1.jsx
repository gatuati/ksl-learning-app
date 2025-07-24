"use client";

import { useState } from "react";
import { Link } from "react-router-dom";

const Unit1 = () => {
  const [selectedVideo, setSelectedVideo] = useState("");

  const handleClick = (key) => {
    setSelectedVideo(`/videos/${key}.mp4`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Learn KSL</h1>
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </nav>

      {/* Main content */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-xl font-semibold mb-4">Unit 1: Alphabets & Numbers (KSL)</h2>
        <p className="mb-6 text-gray-600">Click a letter or number to watch its sign in KSL</p>

        {/* Alphabet buttons */}
        <div className="grid grid-cols-8 gap-3 mb-8">
          {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
            <button
              key={letter}
              onClick={() => handleClick(letter)}
              className="bg-white border rounded shadow hover:bg-blue-100 transition px-4 py-2"
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Number buttons */}
        <div className="grid grid-cols-10 gap-3 mb-8">
          {[...Array(10).keys()].map((n) => (
            <button
              key={n + 1}
              onClick={() => handleClick((n + 1).toString())}
              className="bg-white border rounded shadow hover:bg-blue-100 transition px-4 py-2"
            >
              {n + 1}
            </button>
          ))}
        </div>

        {/* Video Player */}
        {selectedVideo && (
          <div className="mt-8">
            <video
              key={selectedVideo} // force reload on change
              controls
              autoPlay
              className="w-full max-w-xl mx-auto rounded shadow-lg"
            >
              <source src={selectedVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default Unit1;
