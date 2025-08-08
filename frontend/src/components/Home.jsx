import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-xl text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">🎉 Welcome to AI Playground</h1>
        <p className="text-gray-600 mb-8 text-lg">
          You're successfully logged in! Start exploring the AI tools below.
        </p>

        {/* Feature Buttons */}
        <div className="flex flex-col gap-4 text-left">
          <Link
            to="/audioupload"
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-5 rounded-xl transition duration-300"
          >
            🎧 <span>Audio to Text Transcription</span>
          </Link>

          <Link
            to="/image-analysis"
            className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-5 rounded-xl transition duration-300"
          >
            🖼️ <span>Image Analysis</span>
          </Link>

          <Link
            to="/summarize"
            className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-5 rounded-xl transition duration-300"
          >
            📄 <span>Summarization</span>
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-5 rounded-xl w-full transition duration-300"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}

export default Home;
