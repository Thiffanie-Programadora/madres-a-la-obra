import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Loading({ message = "Cargando plataforma..." }) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4 p-8">
      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#E6007E] to-[#7B008A] flex items-center justify-center text-white shadow-xl animate-spin">
        <Sparkles className="w-6 h-6 text-[#A3E4D7]" />
      </div>
      <p className="text-sm font-bold text-gray-600 animate-pulse">{message}</p>
    </div>
  );
}
