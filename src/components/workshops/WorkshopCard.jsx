import React from 'react';
import { Users, Clock, Volume2 } from 'lucide-react';
import Boton from '../boton';

export default function WorkshopCard({ workshop, onSelectWorkshop }) {
  const w = workshop;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border-2 border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Card Image Header */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={w.image} 
            alt={w.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            <span className={`px-3 py-1 rounded-full text-[11px] font-bold text-white shadow-md ${
              w.modality === 'Virtual' ? 'bg-[#7B008A]' : 'bg-[#E6007E]'
            }`}>
              {w.modality}
            </span>
            <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#A3E4D7] text-[#7B008A] shadow-md">
              {w.accessType}
            </span>
          </div>

          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-gray-700 flex items-center gap-1 shadow">
            <Users className="w-3 h-3 text-[#E6007E]" />
            <span>{w.spotsLeft} cupos libres</span>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 space-y-4">
          <div className="flex flex-wrap gap-1">
            {w.accessibility && w.accessibility.map((acc, i) => (
              <span key={i} className="text-[10px] font-semibold bg-purple-50 text-[#7B008A] px-2 py-0.5 rounded-md border border-purple-100 flex items-center gap-1">
                <Volume2 className="w-2.5 h-2.5" />
                {acc}
              </span>
            ))}
          </div>

          <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#E6007E] transition-colors leading-snug">
            {w.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-600 bg-pink-50/50 p-2.5 rounded-xl border border-pink-100">
            <Clock className="w-4 h-4 text-[#E6007E] shrink-0" />
            <span>{w.schedule}</span>
          </div>

          <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
            {w.description}
          </p>

          {w.accessType === 'Skill-Swap' && (
            <div className="text-[11px] bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-100">
              <span className="font-bold">Busca trueque por:</span> {w.swapWanted}
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <img 
            src={w.facilitatorAvatar} 
            alt={w.facilitator} 
            className="w-9 h-9 rounded-full border-2 border-pink-200 object-cover"
          />
          <div>
            <p className="text-xs font-bold text-gray-800 leading-none">{w.facilitator}</p>
            <p className="text-[10px] text-gray-500 mt-0.5">{w.facilitatorRole}</p>
          </div>
        </div>

        <Boton 
          variant={w.accessType === 'Skill-Swap' ? 'primary' : 'secondary'} 
          size="sm"
          onClick={() => onSelectWorkshop(w)}
        >
          {w.accessType === 'Skill-Swap' ? 'Solicitar Trueque' : 'Inscribirme'}
        </Boton>
      </div>
    </div>
  );
}
