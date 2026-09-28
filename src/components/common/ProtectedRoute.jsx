import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="p-8 text-center text-xs font-bold text-gray-500">Cargando...</div>;

  // Si no hay sesión iniciada, redirigir al login principal
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si el rol del usuario no está permitido para esta ruta
  if (allowedRoles && !allowedRoles.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
