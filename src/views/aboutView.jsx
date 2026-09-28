import React from 'react';
import { Heart, Shield, Award, Users } from 'lucide-react';

export default function AboutView() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="bg-[#A3E4D7] text-[#7B008A] text-xs font-black px-4 py-1 rounded-full uppercase">
          Nuestra Misión Institucional
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900">Sobre "Madres a la Obra"</h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Somos un ecosistema digital inclusivo que busca reducir la brecha de formación e ingresos en madres cuidadoras a través de la economía colaborativa.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-3">
          <Heart className="w-8 h-8 text-[#E6007E]" />
          <h3 className="font-bold text-lg text-gray-900">Sororidad Comunitaria</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Fomentamos redes de apoyo mutuo para que ninguna madre tenga que posponer su crecimiento personal o profesional.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-3">
          <Shield className="w-8 h-8 text-[#7B008A]" />
          <h3 className="font-bold text-lg text-gray-900">Conciliación Real</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Adaptamos los horarios de aprendizaje a la realidad del cuidado infantil, la siesta escolar y las tareas del hogar.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-3">
          <Award className="w-8 h-8 text-emerald-600" />
          <h3 className="font-bold text-lg text-gray-900">Inclusión LESCO & Accesibilidad</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Garantizamos intérpretes LESCO en vivo y contenidos en macrotipo para que la educación sea accesibles para todas.
          </p>
        </div>
      </div>
    </div>
  );
}
