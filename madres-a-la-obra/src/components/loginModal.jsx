import React, { useState } from 'react';
import { X, Heart, Lock, Mail, Eye, EyeOff } from 'lucide-react';
import Boton from './boton';
import { useAuth } from '../hooks/useAuth';
import { loginUser } from '../services/authService';

export default function LoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      login(user);
      alert(`¡Bienvenida de nuevo ${user.nombre || user.name}!`);
      onClose();
    } catch (err) {
      setError(err.message || 'Credenciales inválidas');
    } finally {
      setLoading(false);
    }
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
          <p className="text-xs text-gray-500">Accede a tus talleres inscritos y solicitudes de trueque activas.</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-2xl text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Correo / Usuario</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="thifanie@madresalaobra.com"
                className="w-full pl-9 pr-3 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#E6007E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Contraseña</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-9 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#E6007E]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <Boton variant="primary" size="md" type="submit" disabled={loading} className="w-full">
            {loading ? 'Validando...' : 'Ingresar a la Red'}
          </Boton>
        </form>
      </div>
    </div>
  );
}
