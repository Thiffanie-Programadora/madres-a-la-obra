import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Sparkles, Clock, MapPin, Users, Heart, Award, 
  ArrowRight, CheckCircle2, RefreshCw, Scissors, Cake, Smartphone, 
  DollarSign, Volume2, ShieldCheck, HelpCircle, Star, MessageCircle
} from 'lucide-react';
import Boton from '../components/boton';

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
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-pink-50/60 via-purple-50/30 to-transparent rounded-b-3xl">
        {/* Background decorative ribbons */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-[#E6007E]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-[#7B008A]/10 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Ribbon Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-pink-200 shadow-sm text-xs font-bold text-[#E6007E]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E6007E] animate-ping" />
              Comunidad Inclusiva de Aprendizaje Directo
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Aprende, emprende y comparte habilidades{' '}
              <span className="bg-gradient-to-r from-[#E6007E] via-[#7B008A] to-[#E6007E] bg-clip-text text-transparent underline decoration-pink-300 decoration-wavy">
                sin salir de casa
              </span>.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
              Diseñado exclusivamente para madres cuidadoras. Concilia tu jornada del hogar con talleres 100% flexibles, intercambios directos de saberes (Skill-Swap) sin dinero e intérprete LESCO integrado.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Boton 
                variant="primary" 
                size="lg" 
                onClick={() => {
                  const elem = document.getElementById('talleres-destacados');
                  elem?.scrollIntoView({ behavior: 'smooth' });
                }}
                icon={Search}
              >
                Explorar Talleres
              </Boton>

              <Boton 
                variant="outlinePurple" 
                size="lg" 
                onClick={onOpenPostModal}
                icon={RefreshCw}
              >
                Quiero Enseñar / Ofrecer Trueque
              </Boton>
            </div>

            {/* Quick Stat Badges */}
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

          {/* Right Column: Floating Cards Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Container */}
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

              {/* Floating Testimonial Card */}
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
              <div 
                key={w.id}
                className="bg-white rounded-3xl overflow-hidden border-2 border-pink-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
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
                    
                    {/* Accessibility Badges */}
                    <div className="flex flex-wrap gap-1">
                      {w.accessibility.map((acc, i) => (
                        <span key={i} className="text-[10px] font-semibold bg-purple-50 text-[#7B008A] px-2 py-0.5 rounded-md border border-purple-100 flex items-center gap-1">
                          <Volume2 className="w-2.5 h-2.5" />
                          {acc}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="font-extrabold text-lg text-gray-900 group-hover:text-[#E6007E] transition-colors leading-snug">
                      {w.title}
                    </h3>

                    {/* Schedule */}
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-pink-50/50 p-2.5 rounded-xl border border-pink-100">
                      <Clock className="w-4 h-4 text-[#E6007E] shrink-0" />
                      <span>{w.schedule}</span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                      {w.description}
                    </p>

                    {/* Swap Interest */}
                    {w.accessType === 'Skill-Swap' && (
                      <div className="text-[11px] bg-emerald-50 text-emerald-800 p-2 rounded-xl border border-emerald-100">
                        <span className="font-bold">Busca trueque por:</span> {w.swapWanted}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer: Facilitator & CTA */}
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
