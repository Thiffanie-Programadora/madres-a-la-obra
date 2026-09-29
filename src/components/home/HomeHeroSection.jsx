import React from 'react';
import { Search, RefreshCw } from 'lucide-react';
import Boton from '../boton';

export default function HomeHeroSection({ onOpenPostModal, searchTerm, setSearchTerm }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/60 via-purple-50/30 to-transparent rounded-b-3xl">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E6007E]/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#7B008A]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Text & CTA */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm text-xs font-bold text-[#E6007E]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E6007E] animate-ping" />
            Comunidad Inclusiva de Aprendizaje Directo
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
            Aprende, emprende y comparte habilidades{' '}
            <span className="bg-gradient-to-r from-[#E6007E] via-[#7B008A] to-[#E6007E] bg-clip-text text-transparent underline decoration-pink-300 decoration-wavy">
              sin salir de casa
            </span>.
          </h1>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
            Diseñado exclusivamente para madres cuidadoras. Concilia tu jornada del hogar con talleres 100% flexibles, intercambios directos de saberes (Skill-Swap) sin dinero e intérprete LESCO integrado.
          </p>

          <div className="pt-2 space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 max-w-xl">
              <div className="relative flex-1">
                <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm || ''}
                  placeholder="¿Qué curso o habilidad deseas buscar? (ej. Costura, Marketing, Repostería)..."
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      document.getElementById('talleres-destacados')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border-2 border-pink-200 shadow-md text-sm focus:outline-none focus:ring-2 focus:ring-[#E6007E] text-gray-900 font-medium"
                />
              </div>
              <Boton 
                variant="primary" 
                size="lg" 
                onClick={() => {
                  document.getElementById('talleres-destacados')?.scrollIntoView({ behavior: 'smooth' });
                }}
                icon={Search}
              >
                Buscar Cursos
              </Boton>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs text-gray-500 font-bold">O también puedes:</span>
              <Boton 
                variant="outlinePurple" 
                size="sm" 
                onClick={onOpenPostModal}
                icon={RefreshCw}
              >
                Ofrecer Taller / Trueque
              </Boton>
            </div>
          </div>



          <div className="pt-6 grid grid-cols-3 gap-3 border-t border-pink-100">
            <div className="bg-white p-3 rounded-2xl border border-pink-100 shadow-sm">
              <p className="text-xl font-black text-[#E6007E]">+1,250</p>
              <p className="text-xs text-gray-500 font-medium">Madres Inclusivas</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-pink-100 shadow-sm">
              <p className="text-xl font-black text-[#7B008A]">100%</p>
              <p className="text-xs text-gray-500 font-medium">Flexible (Conciliación)</p>
            </div>
            <div className="bg-white p-3 rounded-2xl border border-pink-100 shadow-sm">
              <p className="text-xl font-black text-[#2ECC71]">Virtual</p>
              <p className="text-xs text-gray-500 font-medium">100% Online & Flexible</p>
            </div>
          </div>
        </div>

        {/* Right Column Showcase */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md lg:max-w-none">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=800&auto=format&fit=crop&q=80" 
                alt="Madres colaborando" 
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7B008A]/80 via-transparent to-transparent flex items-end p-6">
                <div className="text-white space-y-1">
                  <span className="bg-[#A3E4D7] text-[#7B008A] font-extrabold text-xs px-3 py-1 rounded-full">
                    Trueque Exitoso de la Semana
                  </span>
                  <h3 className="font-bold text-lg">Corte de Cabello x Contabilidad</h3>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-4 sm:-left-8 bg-white p-4 sm:p-5 rounded-3xl shadow-xl border-2 border-pink-100 max-w-xs animate-pulse-slow">
              <div className="flex items-center gap-3 mb-2">
                <img 
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" 
                  alt="Lucía" 
                  className="w-10 h-10 rounded-full border-2 border-[#E6007E]"
                />
                <div>
                  <p className="text-xs font-bold text-gray-900">Lucía Fernández</p>
                  <p className="text-[10px] text-pink-600 font-medium">Mamá Emprendedora</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 italic leading-relaxed">
                "Cambié 4 horas de corte y confección por clases de finanzas para abrir mi tienda virtual."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
