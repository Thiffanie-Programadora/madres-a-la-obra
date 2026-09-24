import React, { useState } from 'react';
import { X, Sparkles, User, Heart, Lock, Mail, Volume2, CheckCircle2 } from 'lucide-react';
import Boton from '../components/boton';

export function LoginModal({ isOpen, onClose }) {
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

export function SwapModal({ isOpen, onClose, onAddSwap }) {
  const [offeredBy, setOfferedBy] = useState('');
  const [offeredSkill, setOfferedSkill] = useState('');
  const [requestedSkill, setRequestedSkill] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSwap = {
      id: Date.now(),
      offeredBy,
      offeredSkill,
      requestedSkill,
      date: new Date().toISOString().split('T')[0],
      status: 'Pendiente',
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
    };

    onAddSwap(newSwap);
    alert('¡Propuesta de Trueque publicada con éxito en la comunidad!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border-2 border-pink-200 shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#A3E4D7] text-[#7B008A] flex items-center justify-center mx-auto shadow-md font-black">
            🤝
          </div>
          <h3 className="text-2xl font-black text-gray-900">Publicar Propuesta de Trueque</h3>
          <p className="text-xs text-gray-500">Conecta sin dinero con otras madres dispuestas a aprender y enseñar.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Tu Nombre o Apodo</label>
            <input
              type="text"
              required
              value={offeredBy}
              onChange={(e) => setOfferedBy(e.target.value)}
              placeholder="ej. Karla M."
              className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">¿Qué Habilidad o Saber Ofreces Enseñar?</label>
            <input
              type="text"
              required
              value={offeredSkill}
              onChange={(e) => setOfferedSkill(e.target.value)}
              placeholder="ej. Corte de Cabello Básico, Recetas de Repostería, Inglés Conversacional..."
              className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">¿Qué Habilidad Te Gustaría Aprender a Cambio?</label>
            <input
              type="text"
              required
              value={requestedSkill}
              onChange={(e) => setRequestedSkill(e.target.value)}
              placeholder="ej. Taller de Contabilidad para Emprendedoras, Edición en CapCut..."
              className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Boton variant="ghost" size="sm" onClick={onClose}>
              Cancelar
            </Boton>
            <Boton variant="mint" size="sm" type="submit">
              Publicar Trueque
            </Boton>
          </div>
        </form>
      </div>
    </div>
  );
}

export function WorkshopDetailModal({ workshop, onClose, onRegister }) {
  if (!workshop) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border-2 border-pink-200 shadow-2xl relative my-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>

        <div className="relative h-56 rounded-2xl overflow-hidden">
          <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#7B008A] text-white font-bold text-xs px-3 py-1 rounded-full">
              {workshop.modality}
            </span>
            <span className="bg-[#A3E4D7] text-[#7B008A] font-extrabold text-xs px-3 py-1 rounded-full">
              {workshop.accessType}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {workshop.accessibility.map((acc, i) => (
              <span key={i} className="text-[10px] bg-purple-50 text-[#7B008A] font-bold px-2.5 py-1 rounded-full border border-purple-200">
                🤟 {acc}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-black text-gray-900">{workshop.title}</h2>

          <div className="flex items-center gap-3 bg-pink-50 p-3 rounded-2xl border border-pink-100 text-xs">
            <img src={workshop.facilitatorAvatar} alt={workshop.facilitator} className="w-10 h-10 rounded-full border border-[#E6007E]" />
            <div>
              <p className="font-bold text-gray-900">{workshop.facilitator}</p>
              <p className="text-[11px] text-gray-500">{workshop.facilitatorRole}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {workshop.description}
          </p>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-1.5 text-xs text-gray-700">
            <p><strong>Horario Compatible:</strong> {workshop.schedule}</p>
            <p><strong>Cupos Disponibles:</strong> {workshop.spotsLeft} de {workshop.spots}</p>
            {workshop.accessType === 'Skill-Swap' && (
              <p className="text-emerald-800 font-semibold">
                <strong>Trueque deseado por la facilitadora:</strong> {workshop.swapWanted}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Boton variant="ghost" size="sm" onClick={onClose}>
            Cerrar
          </Boton>
          <Boton variant="primary" size="md" onClick={() => onRegister(workshop)}>
            Confirmar Solicitud / Inscripción
          </Boton>
        </div>
      </div>
    </div>
  );
}
