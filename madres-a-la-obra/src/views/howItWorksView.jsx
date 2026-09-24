import React from 'react';
import { RefreshCw, CheckCircle, Clock, Volume2, Heart, Shield, Sparkles, BookOpen } from 'lucide-react';
import Boton from '../components/boton';

export default function HowItWorksView({ onOpenSwapModal, setCurrentView }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Title */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-pink-100 text-[#E6007E] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider">
          Guía Comunitaria
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
          ¿Cómo Funciona "Madres a la Obra"?
        </h1>
        <p className="text-base text-gray-600 leading-relaxed">
          Diseñamos una plataforma que se adapta a las dinámicas del hogar, la maternidad y las necesidades de flexibilidad.
        </p>
      </div>

      {/* 4 Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-pink-100 text-[#E6007E] flex items-center justify-center font-black">
            <Clock className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Horarios de Conciliación</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Nuestros talleres tienen horarios coordinados con la siesta de los bebés o la jornada escolar de los niños.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-[#7B008A] flex items-center justify-center font-black">
            <RefreshCw className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Trueque Skill-Swap</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Intercambia conocimientos sin intermediación de dinero. Tu tiempo de enseñanza financia tu aprendizaje.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-[#7B008A] flex items-center justify-center font-black">
            <Volume2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Accesibilidad LESCO</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Intérpretes en vivo y subtítulos adaptados en Macrotipo para garantizar la inclusión de madres con discapacidad.
          </p>
        </div>

        <div className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
            <Shield className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">Espacio Seguro y Sororo</h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Una comunidad moderada para compartir inquietudes, emprender sin juicio y apoyarnos entre madres.
          </p>
        </div>

      </div>

      <div className="text-center pt-4 flex justify-center gap-4">
        <Boton variant="primary" size="lg" onClick={() => setCurrentView('talleres')}>
          Explorar Talleres Disponibles
        </Boton>
        <Boton variant="outline" size="lg" onClick={onOpenSwapModal}>
          Ofrecer mi Trueque
        </Boton>
      </div>

    </div>
  );
}
