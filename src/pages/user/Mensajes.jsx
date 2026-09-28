import React from 'react';
import { MessageCircle, Send } from 'lucide-react';

export default function Mensajes() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="bg-purple-100 text-[#7B008A] text-xs font-black px-3.5 py-1 rounded-full uppercase">
          Comunicación Directa
        </span>
        <h1 className="text-3xl font-black text-gray-900">Mensajes & Coordinación de Trueques</h1>
        <p className="text-xs text-gray-500">Coordina horarios de trueque y consultas directas con otras mamás facilitadoras.</p>
      </div>

      <div className="bg-white rounded-3xl border border-pink-100 p-8 text-center space-y-4 shadow-sm">
        <MessageCircle className="w-12 h-12 text-[#E6007E] mx-auto animate-bounce" />
        <h3 className="font-extrabold text-lg text-gray-800">Centro de Mensajería Comunitario Activo</h3>
        <p className="text-xs text-gray-600 max-w-md mx-auto">
          Tus conversaciones con Marta Castro y Lucía Fernández sobre intercambio de clases se encuentran sincronizadas.
        </p>
      </div>
    </div>
  );
}
