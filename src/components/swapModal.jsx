import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import Boton from './boton';

export default function SwapModal({ isOpen, onClose, onAddSwap }) {
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
            <Sparkles className="w-6 h-6 text-[#7B008A]" />
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
