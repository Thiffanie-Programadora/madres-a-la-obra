import React, { useState } from 'react';
import { 
  Users, RefreshCw, Heart, Sparkles, PlusCircle, CheckCircle, 
  Search, ArrowRight, ShieldCheck, Award, MessageCircle, Clock, Volume2 
} from 'lucide-react';
import Boton from '../components/boton';

import { useNavigate } from 'react-router-dom';

export default function SkillSwapView({ swapRequests, onOpenSwapModal }) {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('Aprobado');

  const filteredSwaps = swapRequests.filter(req => {
    if (filter === 'all') return true;
    return req.status.toLowerCase() === filter.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#7B008A] via-[#E6007E] to-[#7B008A] text-white p-8 sm:p-12 rounded-3xl shadow-xl space-y-6 text-center sm:text-left relative overflow-hidden">
        <div className="max-w-3xl space-y-4 relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="bg-[#A3E4D7] text-[#7B008A] font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider">
              Red Sorora & Economía Colaborativa
            </span>
            <button 
              onClick={() => navigate('/')} 
              className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-xl text-xs font-bold transition-all"
            >
              ← Volver al Inicio
            </button>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black leading-tight tracking-tight">
            Comunidad Skill-Swap de Madres
          </h1>
          <p className="text-sm sm:text-base text-pink-100 leading-relaxed">
            Intercambia directamente tus talentos del hogar o profesionales con otras madres cuidadoras. ¡Sin usar dinero! Una hora de tus saberes vale exactamente una hora de aprendizaje.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Boton variant="mint" size="lg" onClick={onOpenSwapModal} icon={PlusCircle}>
              Publicar mi propuesta de Trueque
            </Boton>
            <Boton variant="outline" size="lg" onClick={() => navigate('/talleres')}>
              Explorar Talleres
            </Boton>
          </div>
        </div>
      </div>

      {/* RECENT SWAP OFFERINGS GRID */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-black text-gray-900">Intercambios Comunitarios Activos</h2>
            <p className="text-xs text-gray-500">Conecta con mamás que están buscando aprender o enseñar hoy mismo.</p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {['all', 'Pendiente', 'Aprobado'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-3.5 py-1.5 rounded-2xl text-xs font-bold transition-all ${
                  filter === status
                    ? 'bg-[#E6007E] text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-pink-50 border border-gray-200'
                }`}
              >
                {status === 'all' ? 'Todos los Trueques' : status}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSwaps.map((req) => (
            <div key={req.id} className="bg-white rounded-3xl p-6 border-2 border-pink-100 shadow-md hover:shadow-xl transition-all space-y-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={req.avatar} alt={req.offeredBy} className="w-12 h-12 rounded-full border-2 border-[#E6007E] object-cover" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{req.offeredBy}</h4>
                      <span className="text-[10px] text-gray-500">Publicado: {req.date}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                    req.status === 'Aprobado' ? 'bg-[#A3E4D7] text-[#7B008A]' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="bg-pink-50/60 p-4 rounded-2xl space-y-2 border border-pink-100">
                  <div>
                    <span className="text-[10px] font-bold text-[#E6007E] uppercase block">Ofrece Enseñar:</span>
                    <p className="text-xs font-bold text-gray-800">{req.offeredSkill}</p>
                  </div>
                  <div className="pt-1 border-t border-pink-100/60">
                    <span className="text-[10px] font-bold text-[#7B008A] uppercase block">Busca Aprender:</span>
                    <p className="text-xs font-bold text-gray-800">{req.requestedSkill}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] text-gray-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#E6007E]" />
                  Horario Escolar
                </span>
                <Boton variant="outline" size="sm" onClick={() => alert(`Proponiendo trueque directo a ${req.offeredBy}`)}>
                  Conectar Trueque
                </Boton>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
