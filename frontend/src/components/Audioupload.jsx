import React, { useState } from 'react';
import axios from 'axios';

const AudioUpload = () => {
  const [file, setFile] = useState(null);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setTranscript('');
    setError('');
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select an audio file first.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/audio/transcribe', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setTranscript(response.data.transcript);
    } catch (err) {
      setError('Error while uploading or transcribing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Audio to Text Transcription</h2>

      <input
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:border file:rounded-full file:border-gray-300 file:text-sm file:bg-gray-100 hover:file:bg-gray-200"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Transcribing...' : 'Upload & Transcribe'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {transcript && (
        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h3 className="font-semibold mb-2">Transcript:</h3>
          <p className="whitespace-pre-wrap text-gray-800">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default AudioUpload;
