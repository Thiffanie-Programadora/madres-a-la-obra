import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import Boton from '../../components/boton';

export default function AccessDenied() {
  const location = useLocation();
  const userRole = location.state?.userRole || 'sin rol';

  return (
    <div className="max-w-xl mx-auto my-16 p-8 bg-white rounded-3xl border-2 border-red-200 text-center space-y-6 shadow-xl">
      <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
        <ShieldAlert className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-black text-gray-900">Acceso Denegado</h1>
      <p className="text-sm text-gray-600 leading-relaxed">
        Tu perfil actual (<strong>{userRole}</strong>) no posee los permisos requeridos para acceder a este módulo reservado de la plataforma.
      </p>
      <div className="flex justify-center gap-3 pt-2">
        <Link to="/">
          <Boton variant="primary" size="md">
            Volver a la Página Principal
          </Boton>
        </Link>
        <Link to="/perfil">
          <Boton variant="outlinePurple" size="md">
            Ir a Mi Perfil
          </Boton>
        </Link>
      </div>
    </div>
  );
}
