import React, { useState } from 'react';
import { User, Mail, Shield, Sparkles, LogOut, CheckCircle } from 'lucide-react';
import Boton from '../../components/boton';
import { useAuth } from '../../hooks/useAuth';

export default function Perfil() {
  const { user, logout, switchRole } = useAuth();
  const [editing, setEditing] = useState(false);
  const [nombre, setNombre] = useState(user?.nombre || '');
  const [bio, setBio] = useState(user?.bio || '');

  const handleSave = (e) => {
    e.preventDefault();
    alert('¡Perfil actualizado con éxito!');
    setEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      {/* Header Profile Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-pink-100 shadow-md flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <img
            src={user?.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"}
            alt={user?.nombre}
            className="w-20 h-20 rounded-full border-4 border-[#E6007E] object-cover shadow"
          />
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-gray-900">{user?.nombre}</h1>
            <p className="text-xs text-gray-500">{user?.email}</p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="bg-[#A3E4D7] text-[#7B008A] font-extrabold text-[10px] px-3 py-0.5 rounded-full uppercase">
                Rol: {user?.rol}
              </span>
              <span className="bg-purple-100 text-[#7B008A] font-bold text-[10px] px-3 py-0.5 rounded-full">
                Sesión Activa
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full sm:w-auto">
          {/* Quick Role Switcher for testing/demo */}
          <div className="bg-gray-50 p-2 rounded-2xl border border-gray-200 text-center space-y-1">
            <span className="text-[10px] font-bold text-gray-500 uppercase block">Cambiar Rol (Demostración)</span>
            <div className="flex gap-1 justify-center">
              <button
                onClick={() => switchRole('participante')}
                className={`px-2 py-1 rounded-xl text-[10px] font-bold ${user?.rol === 'participante' ? 'bg-[#E6007E] text-white' : 'bg-white text-gray-700'}`}
              >
                Participante
              </button>
              <button
                onClick={() => switchRole('facilitadora')}
                className={`px-2 py-1 rounded-xl text-[10px] font-bold ${user?.rol === 'facilitadora' ? 'bg-[#7B008A] text-white' : 'bg-white text-gray-700'}`}
              >
                Facilitadora
              </button>
              <button
                onClick={() => switchRole('administradora')}
                className={`px-2 py-1 rounded-xl text-[10px] font-bold ${user?.rol === 'administradora' ? 'bg-amber-500 text-white' : 'bg-white text-gray-700'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <Boton variant="outline" size="sm" onClick={logout} icon={LogOut}>
            Cerrar Sesión
          </Boton>
        </div>
      </div>

      {/* Profile Details Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-200 shadow-sm space-y-6">
        <h2 className="text-xl font-black text-gray-900">Información Personal & Habilidades</h2>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Nombre Completo</label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              disabled={!editing}
              className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 disabled:opacity-75"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Biografía / Presentación</label>
            <textarea
              rows="3"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              disabled={!editing}
              placeholder="Cuéntanos sobre tus hijos, tu negocio o lo que te apasiona aprender..."
              className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 disabled:opacity-75"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            {editing ? (
              <>
                <Boton variant="ghost" size="sm" onClick={() => setEditing(false)}>
                  Cancelar
                </Boton>
                <Boton variant="primary" size="sm" type="submit">
                  Guardar Cambios
                </Boton>
              </>
            ) : (
              <Boton variant="secondary" size="sm" onClick={() => setEditing(true)}>
                Editar Perfil
              </Boton>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
