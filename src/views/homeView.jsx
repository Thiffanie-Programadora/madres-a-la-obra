import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Sparkles, Clock, MapPin, Users, Heart, Award, 
  ArrowRight, CheckCircle2, RefreshCw, Scissors, Cake, Smartphone, 
  DollarSign, Volume2, ShieldCheck, HelpCircle, Star, MessageCircle
} from 'lucide-react';
import Boton from '../components/boton';

import HomeHeroSection from '../components/home/HomeHeroSection';
import WorkshopCard from '../components/workshops/WorkshopCard';

export default function HomeView({ 
  workshops, 
  swapRequests, 
  onSelectWorkshop, 
  onOpenSwapModal, 
  onOpenPostModal,
  setCurrentView
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModality, setSelectedModality] = useState('all');
  const [selectedAccess, setSelectedAccess] = useState('all');

  const normalizeStr = (str) => {
    if (!str) return '';
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    if (window.location.pathname.includes('/talleres')) {
      setTimeout(() => {
        const elem = document.getElementById('talleres-destacados');
        elem?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [window.location.pathname]);

  // Filtering workshops (Excludes 'pendiente' and 'rechazado' from public catalog)
  const filteredWorkshops = workshops.filter(w => {
    const isApproved = w.status !== 'pendiente' && w.status !== 'rechazado' && w.status !== 'Pendiente' && w.status !== 'Rechazado';
    
    const searchNorm = normalizeStr(searchTerm);
    const matchesSearch = !searchNorm || 
                          normalizeStr(w.title).includes(searchNorm) || 
                          normalizeStr(w.description).includes(searchNorm) ||
                          normalizeStr(w.facilitator).includes(searchNorm);
    
    const catNorm = normalizeStr(selectedCategory);
    const matchesCat = selectedCategory === 'all' || 
                       normalizeStr(w.category).includes(catNorm) || 
                       catNorm.includes(normalizeStr(w.category));
                       
    const matchesMod = selectedModality === 'all' || normalizeStr(w.modality) === normalizeStr(selectedModality);
    const matchesAcc = selectedAccess === 'all' || normalizeStr(w.accessType) === normalizeStr(selectedAccess);

    return isApproved && matchesSearch && matchesCat && matchesMod && matchesAcc;
  });

  const categoryCards = [
    { id: 'costura', name: 'Manualidades & Costura', icon: Scissors, color: 'from-pink-500 to-rose-400', count: '18 talleres' },
    { id: 'reposteria', name: 'Repostería & Panadería', icon: Cake, color: 'from-[#7B008A] to-purple-500', count: '24 talleres' },
    { id: 'marketing', name: 'Marketing Digital', icon: Smartphone, color: 'from-fuchsia-600 to-pink-500', count: '15 talleres' },
    { id: 'belleza', name: 'Belleza & Cuidados', icon: Sparkles, color: 'from-teal-400 to-[#A3E4D7]', count: '12 talleres' },
    { id: 'finanzas', name: 'Finanzas del Hogar', icon: DollarSign, color: 'from-emerald-500 to-teal-600', count: '15 talleres' }
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* HERO SECTION COMPONENT */}
      <HomeHeroSection onOpenPostModal={onOpenPostModal} />

      {/* INTERACTIVE SEARCH BAR & FILTERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-pink-100 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por taller, técnica o facilitadora..."
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6007E] text-gray-800"
              />
            </div>

            {/* Category Filter */}
            <div className="w-full md:w-52">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full py-3 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6007E] text-gray-700 font-medium"
              >
                <option value="all">Todas las Categorías</option>
                <option value="costura">Manualidades & Costura</option>
                <option value="reposteria">Repostería & Panadería</option>
                <option value="marketing">Marketing Digital</option>
                <option value="belleza">Belleza & Cuidados</option>
                <option value="finanzas">Finanzas del Hogar</option>
              </select>
            </div>

            {/* Modality Filter */}
            <div className="w-full md:w-44">
              <select
                value={selectedModality}
                onChange={(e) => setSelectedModality(e.target.value)}
                className="w-full py-3 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6007E] text-gray-700 font-medium"
              >
                <option value="all">Toda Modalidad</option>
                <option value="virtual">Virtual</option>
                <option value="presencial">Presencial</option>
              </select>
            </div>

            {/* Access Type Filter */}
            <div className="w-full md:w-44">
              <select
                value={selectedAccess}
                onChange={(e) => setSelectedAccess(e.target.value)}
                className="w-full py-3 px-4 rounded-2xl bg-gray-50 border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#E6007E] text-gray-700 font-medium"
              >
                <option value="all">Todo Tipo Acceso</option>
                <option value="skill-swap">Skill-Swap (Trueque)</option>
                <option value="gratuito">Gratuito</option>
                <option value="sustentable">Sustentable</option>
              </select>
            </div>

          </div>
        </div>
      </section>

      {/* POPULAR CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Explora por Categorías Populares
          </h2>
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Habilidades pensadas para generar ingresos rápidos desde casa o brindar bienestar a la familia.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categoryCards.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id === selectedCategory ? 'all' : cat.id)}
                className={`p-5 rounded-3xl text-center transition-all duration-300 flex flex-col items-center gap-3 border-2 ${
                  isSelected 
                    ? 'border-[#E6007E] bg-pink-50/80 shadow-lg scale-105' 
                    : 'border-white bg-white hover:border-pink-200 shadow-sm hover:scale-102'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.color} flex items-center justify-center text-white shadow-md`}>
                  <IconComp className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="font-bold text-xs sm:text-sm text-gray-800">{cat.name}</h3>
                  <span className="text-[11px] text-gray-500">{cat.count}</span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED WORKSHOPS CATALOG */}
      <section id="talleres-destacados" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-pink-100 pb-4">
          <div>
            <span className="text-xs font-bold text-[#E6007E] uppercase tracking-wider">Catálogo Activo</span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
              Talleres y Cursos Disponibles ({filteredWorkshops.length})
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium">Mostrando coincidencia según siesta y accesibilidad</span>
          </div>
        </div>

        {filteredWorkshops.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border-2 border-dashed border-pink-200 space-y-4">
            <HelpCircle className="w-12 h-12 text-[#E6007E] mx-auto" />
            <h3 className="font-bold text-lg text-gray-800">No se encontraron talleres con esos filtros</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Intenta cambiar los parámetros de búsqueda o explora otras categorías de intercambio.
            </p>
            <Boton variant="outline" size="sm" onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setSelectedModality('all'); setSelectedAccess('all'); }}>
              Restablecer Filtros
            </Boton>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkshops.map((w) => (
              <WorkshopCard 
                key={w.id} 
                workshop={w} 
                onSelectWorkshop={onSelectWorkshop} 
              />
            ))}
          </div>
        )}
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="bg-gradient-to-r from-[#7B008A] via-[#8E009B] to-[#E6007E] text-white py-16 px-4 sm:px-6 lg:px-8 rounded-3xl mx-4 sm:mx-8 shadow-2xl">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="bg-white/20 text-[#A3E4D7] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              Metodología Colaborativa
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              ¿Cómo Funciona el Skill-Swap para Madres?
            </h2>
            <p className="text-pink-100 text-sm leading-relaxed">
              Un sistema sin dinero diseñado para valorar los saberes de cada mujer y permitir el crecimiento mutuo sin barreras económicas.
            </p>
          </div>

          {/* 3 Step Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 relative space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#A3E4D7] text-[#7B008A] font-black text-xl flex items-center justify-center shadow-lg">
                1
              </div>
              <h3 className="font-extrabold text-xl">Publica lo que Sabes</h3>
              <p className="text-xs text-pink-100 leading-relaxed">
                Desde peinados infantiles, recetas de cocina hasta contabilidad o tejido. Todos los saberes tienen valor supremo en nuestra comunidad.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 relative space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E6007E] text-white font-black text-xl flex items-center justify-center shadow-lg">
                2
              </div>
              <h3 className="font-extrabold text-xl">Conecta Sin Dinero</h3>
              <p className="text-xs text-pink-100 leading-relaxed">
                Encuentra una mamá con el conocimiento que necesitas y acuerden un intercambio de horas compatible con los horarios escolares.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 relative space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#7B008A] font-black text-xl flex items-center justify-center shadow-lg">
                3
              </div>
              <h3 className="font-extrabold text-xl">Aprende y Emprende</h3>
              <p className="text-xs text-pink-100 leading-relaxed">
                Adquiere nuevas competencias para iniciar tu negocio propio o simplificar las tareas de tu hogar con acompañamiento sororo.
              </p>
            </div>

          </div>

          <div className="text-center pt-4">
            <Boton variant="mint" size="lg" onClick={onOpenSwapModal}>
              Publicar mi propuesta de Trueque Ahora
            </Boton>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS MODULE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-[#E6007E] uppercase tracking-wider">Voces de Sororidad</span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900">
            Historias Reales de Madres que Crecen Juntas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "Gracias a los talleres grabados de 10:00 AM pude aprender repostería mientras mi bebé dormía. Hoy vendo pastelitos en el colegio.",
              name: "Marta Gómez",
              role: "Mamá de Mateo (2 años)",
              avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "Tener intérprete LESCO en los módulos de finanzas me cambió la vida. Por primera vez siento una plataforma pensada de verdad para todas.",
              name: "Yolanda Solano",
              role: "Mamá Cuidadora",
              avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
            },
            {
              quote: "Intercambié mi conocimiento de costura por asesoría en redes sociales. ¡Subí un 40% las ventas de mis muñecos artesanales!",
              name: "Carla Benavides",
              role: "Mamá Emprendedora",
              avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=150&auto=format&fit=crop&q=80"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm space-y-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-gray-700 italic leading-relaxed">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <img src={item.avatar} alt={item.name} className="w-10 h-10 rounded-full border-2 border-[#E6007E]" />
                <div>
                  <h4 className="text-xs font-bold text-gray-900">{item.name}</h4>
                  <p className="text-[10px] text-gray-500">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
