import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, Heart } from 'lucide-react';
import Boton from '../../components/boton';
import { useAuth } from '../../hooks/useAuth';
import { loginUser } from '../../services/authService';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const from = location.state?.from?.pathname || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await loginUser(email, password);
      login(user);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white rounded-3xl border-2 border-pink-200 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#E6007E] to-[#7B008A] flex items-center justify-center text-white mx-auto shadow-md">
          <Heart className="w-7 h-7 text-[#A3E4D7] fill-[#A3E4D7]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Iniciar Sesión</h1>
        <p className="text-xs text-gray-500">Ingresa a tu cuenta para conciliar, aprender e intercambiar.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-2xl text-center font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-gray-700 mb-1">Correo Electrónico</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="karla@madresalaobra.org"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Contraseña</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>
        </div>

        <Boton variant="primary" size="lg" type="submit" disabled={loading} className="w-full">
          {loading ? 'Validando Credenciales...' : 'Ingresar a la Red'}
        </Boton>
      </form>

      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className="text-[#E6007E] font-bold hover:underline">
            Regístrate Gratis aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
