import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'; // <-- 1. Import RegisterPage ditambahkan di sini

const ProtectedAdminRoute = ({ children }) => {
  const role = localStorage.getItem('role');
  if (role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Halaman Register */}
        <Route path="/register" element={<RegisterPage />} /> {/* <-- 2. Rute path="/register" ditambahkan di sini */}

        {/* Halaman Beranda */}
        <Route path="/" element={
          localStorage.getItem('role') ? <Homepage /> : <Navigate to="/login" replace />
        } />

        {/* Halaman Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminPage />
            </ProtectedAdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}