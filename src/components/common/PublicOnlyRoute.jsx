import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PublicOnlyRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-8 text-center text-xs font-bold text-gray-500">Cargando...</div>;
  }

  // Si ya hay una sesión activa, redirigir al panel correspondiente según el rol
  if (user) {
    if (user.rol === 'administradora') {
      return <Navigate to="/admin" replace />;
    }
    const from = location.state?.from?.pathname || '/';
    return <Navigate to={from !== '/login' ? from : '/'} replace />;
  }

  return children;
};

export default PublicOnlyRoute;
