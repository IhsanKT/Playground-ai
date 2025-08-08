import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import ProtectedRoute from './components/protect';
import Home from './components/Home';
import AudioUpload from './components/Audioupload';
import ImageUpload from './components/Imageupload';
import Summarizer from "./components/summarizer";



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/audioupload"
            element={
              <ProtectedRoute>
                <AudioUpload />
              </ProtectedRoute>
            }
          />
          <Route path="/image-analysis" element={<ProtectedRoute><ImageUpload /></ProtectedRoute>} />
          <Route path="/summarize" element={<ProtectedRoute><Summarizer /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;