// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const usuario_id = localStorage.getItem('usuario_id');

  // Verifica si existe el usuario_id en localStorage
  if (!usuario_id) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;