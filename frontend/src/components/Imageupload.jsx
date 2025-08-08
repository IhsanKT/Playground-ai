import React, { useState } from 'react';
import axios from 'axios';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setCaption('');
    setError('');
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('file', image);

    setLoading(true);
    try {
      const res = await axios.post('https://playground-ai-6aba.onrender.com/image/caption', formData);
      setCaption(res.data.caption);
    } catch (err) {
      setError('Failed to process image.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">🖼️ Image to Caption</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:border-gray-300 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {caption && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Description:</h3>
          <p className="whitespace-pre-wrap text-gray-800">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
