import React, { useState } from 'react';
import { X, Heart, Lock, Mail } from 'lucide-react';
import Boton from './boton';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`¡Bienvenida de nuevo a Madres a la Obra! Sesión iniciada como ${email}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border-2 border-pink-200 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E6007E] to-[#7B008A] flex items-center justify-center text-white mx-auto shadow-md">
            <Heart className="w-6 h-6 text-[#A3E4D7] fill-[#A3E4D7]" />
          </div>
          <h3 className="text-2xl font-black text-gray-900">Iniciar Sesión</h3>
          <p className="text-xs text-gray-500">Accede a tus talleres inscritos y solicitudes de trueque active.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Correo Electrónico</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu.correo@ejemplo.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#E6007E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#E6007E]"
              />
            </div>
          </div>

          <Boton variant="primary" size="md" type="submit" className="w-full">
            Ingresar a la Red
          </Boton>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            ¿Aún no tienes cuenta? <button onClick={() => alert("Formulario de registro abierto.")} className="text-[#E6007E] font-bold">Regístrate Gratis</button>
          </p>
        </div>
      </div>
    </div>
  );
}
