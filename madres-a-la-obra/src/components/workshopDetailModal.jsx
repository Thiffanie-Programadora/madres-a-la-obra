import React from 'react';
import { X } from 'lucide-react';
import Boton from './boton';

export default function WorkshopDetailModal({ workshop, onClose, onRegister }) {
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
                {acc}
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
