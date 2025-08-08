import React, { useState, useRef } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

const Summarizer = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef();

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/summarizer/summarize/file", formData);
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("❌ Failed to summarize file.");
    }
    setLoading(false);
  };

  const handleURLSubmit = async () => {
    if (!url) return;
    const formData = new FormData();
    formData.append("url", url);
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:8000/summarizer/summarize/url", formData);
      setSummary(res.data.summary);
    } catch (err) {
      setSummary("❌ Failed to summarize URL.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">📄 Smart Summarizer</h2>

      {/* File Upload Section */}
      <div className="mb-4">
        <input
          type="file"
          accept=".pdf,.docx"
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
        />
        <button
          onClick={handleChooseFile}
          className="bg-gray-300 text-black px-4 py-2 rounded w-full mb-2"
        >
          📁 Choose File
        </button>
        {file && (
          <p className="text-sm text-gray-600 mb-2 text-center">
            Selected: <strong>{file.name}</strong>
          </p>
        )}
        <button
          onClick={handleFileUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Summarize File
        </button>
      </div>

      {/* URL Summarization Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="border px-3 py-2 w-full mb-2"
        />
        <button
          onClick={handleURLSubmit}
          className="bg-green-600 text-white px-4 py-2 rounded w-full"
        >
          Summarize URL
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-center text-gray-500 mb-4">⏳ Summarizing...</p>
      )}

      {/* Summary Output */}
      {summary && (
        <div className="mt-6 bg-gray-100 p-4 rounded">
          <h3 className="font-semibold mb-2">📝 Summary:</h3>
          <div className="whitespace-pre-wrap text-gray-800">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default Summarizer;
