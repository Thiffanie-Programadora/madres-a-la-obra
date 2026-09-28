import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Sparkles, Heart } from 'lucide-react';
import Boton from '../../components/boton';
import { useAuth } from '../../hooks/useAuth';
import { registerUser } from '../../services/authService';

export default function Registro() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'participante',
    habilidadesOfrecidas: '',
    habilidadesBuscadas: '',
    bio: ''
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const nuevoUsuario = await registerUser(formData);
      login(nuevoUsuario);
      alert('¡Bienvenida a Madres a la Obra! Tu registro se ha completado exitosamente.');
      navigate('/');
    } catch (err) {
      setError(err.message || 'Error al completar el registro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white rounded-3xl border-2 border-pink-200 shadow-2xl space-y-6">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl bg-[#A3E4D7] text-[#7B008A] flex items-center justify-center mx-auto shadow-md">
          <Sparkles className="w-7 h-7 text-[#7B008A]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-gray-900">Crear Cuenta de Usuaria</h1>
        <p className="text-xs text-gray-500">Únete a la red inclusiva de aprendizaje y trueque sin dinero.</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded-2xl text-center font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block font-bold text-gray-700 mb-1">Nombre Completo</label>
          <div className="relative">
            <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              placeholder="ej. Marta Castro Mora"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">Correo Electrónico</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="marta@ejemplo.com"
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Rol de Registro</label>
            <select
              value={formData.rol}
              onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
              className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium"
            >
              <option value="participante">Participante (Madre Cuidadora)</option>
              <option value="facilitadora">Facilitadora (Imparte Talleres)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Habilidad Principal a Ofrecer</label>
            <input
              type="text"
              value={formData.habilidadesOfrecidas}
              onChange={(e) => setFormData({ ...formData, habilidadesOfrecidas: e.target.value })}
              placeholder="ej. Costura básica, Repostería"
              className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold text-gray-700 mb-1">¿Qué deseas aprender?</label>
          <input
            type="text"
            value={formData.habilidadesBuscadas}
            onChange={(e) => setFormData({ ...formData, habilidadesBuscadas: e.target.value })}
            placeholder="ej. Marketing Digital, Finanzas"
            className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
          />
        </div>

        <Boton variant="mint" size="lg" type="submit" disabled={loading} className="w-full">
          {loading ? 'Creando Perfil...' : 'Completar Registro'}
        </Boton>
      </form>

      <div className="text-center pt-2 border-t border-gray-100">
        <p className="text-xs text-gray-500">
          ¿Ya posees una cuenta?{' '}
          <Link to="/login" className="text-[#E6007E] font-bold hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
