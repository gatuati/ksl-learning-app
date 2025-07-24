// src/components/VideoPlayer.jsx
import { useParams, Link } from "react-router-dom";

const videoData = [
  { _id: "a", title: "A", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
  { _id: "1", title: "1", url: "https://www.w3schools.com/html/movie.mp4" },
  // Add more videos as needed
];

const VideoPlayer = () => {
  const { id } = useParams();
  const video = videoData.find((v) => v._id === id);

  if (!video) return <div className="text-center mt-10">Video not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <Link
        to="/learn/unit1"
        className="text-blue-600 hover:underline mb-4 text-sm"
      >
        ← Back to Unit 1
      </Link>
      <h1 className="text-2xl font-bold mb-4">{video.title}</h1>
      <video
        width="640"
        height="360"
        controls
        className="rounded shadow-lg border"
      >
        <source src={video.url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
