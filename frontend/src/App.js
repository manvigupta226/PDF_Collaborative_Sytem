import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';
import PDFDetailPage from './pages/PDFDetailPage';
import SharedPDFPage from './pages/SharedPDFPage';

// Utility to check if user is logged in
const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route: redirect based on auth */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/login" /> : <LoginPage />
          }
        />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated() ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/file"
          element={
            isAuthenticated() ? <PDFDetailPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Publicly accessible shared PDF link */}
        <Route path="/shared/:share_id" element={<SharedPDFPage />} />

        {/* 404 fallback */}
        <Route path="*" element={<div className="p-6">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
