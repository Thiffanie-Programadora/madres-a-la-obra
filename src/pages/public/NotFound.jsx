import React from 'react';
import { Link } from 'react-router-dom';
import { HelpCircle } from 'lucide-react';
import Boton from '../../components/boton';

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto my-20 p-8 bg-white rounded-3xl border-2 border-pink-100 text-center space-y-6 shadow-xl">
      <div className="w-16 h-16 rounded-3xl bg-pink-100 text-[#E6007E] flex items-center justify-center mx-auto">
        <HelpCircle className="w-8 h-8" />
      </div>
      <h1 className="text-4xl font-black text-gray-900">404 - Página No Encontrada</h1>
      <p className="text-sm text-gray-600 leading-relaxed">
        La ruta que intentas visitar no existe o ha sido movida dentro del directorio de Madres a la Obra.
      </p>
      <div className="pt-2">
        <Link to="/">
          <Boton variant="primary" size="lg">
            Regresar al Inicio
          </Boton>
        </Link>
      </div>
    </div>
  );
}
