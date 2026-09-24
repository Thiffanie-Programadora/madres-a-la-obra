import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function ProtectedRoute({ roles, children }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.rol)) {
    return (
      <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border-2 border-red-200 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl font-black text-red-600">Acceso Restringido</h2>
        <p className="text-sm text-gray-600">
          Tu rol actual (<strong>{user.rol}</strong>) no cuenta con los permisos requeridos para acceder a esta sección de administración.
        </p>
        <div className="pt-2">
          <a href="/" className="inline-block bg-[#7B008A] text-white px-6 py-2.5 rounded-2xl font-bold text-xs">
            Volver a la Página Principal
          </a>
        </div>
      </div>
    );
  }

  return children;
}
