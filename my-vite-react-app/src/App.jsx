import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FeedPage from './pages/FeedPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { AuthProvider } from './contexts/AuthProvider';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/feed" element={<FeedPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Navigate to="/feed" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
