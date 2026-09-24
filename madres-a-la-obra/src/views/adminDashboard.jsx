import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, Tags, RefreshCw, ClipboardList, 
  HelpCircle, Headphones, Search, Bell, Sparkles, Plus, CheckCircle, 
  XCircle, Edit, Trash2, ArrowUpRight, TrendingUp, AlertCircle, Eye, 
  Volume2, ShieldAlert, Check
} from 'lucide-react';
import Boton from '../components/boton';

export default function AdminDashboard({ 
  workshops, 
  setWorkshops, 
  swapRequests, 
  setSwapRequests, 
  setCurrentView 
}) {
  const [activeTab, setActiveTab] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal State for New Workshop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkshopData, setNewWorkshopData] = useState({
    title: '',
    category: 'Manualidades & Costura',
    facilitator: 'Karla Mora',
    facilitatorRole: 'Docente y Mamá Cuidadora',
    modality: 'Virtual',
    schedule: 'Mar y Jue (10:00 - 11:30 AM)',
    accessType: 'Skill-Swap',
    spots: 15,
    description: '',
    swapWanted: '',
    accessibilityLesco: true,
    accessibilityMacrotipo: true,
    accessibilityPhysical: false
  });

  // Action handlers
  const handleApproveSwap = (id) => {
    setSwapRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Aprobado' } : req));
  };

  const handleRejectSwap = (id) => {
    setSwapRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rechazado' } : req));
  };

  const handleDeleteWorkshop = (id) => {
    if (confirm('¿Estás segura de eliminar este taller del directorio?')) {
      setWorkshops(prev => prev.filter(w => w.id !== id));
    }
  };

  const handleCreateWorkshopSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      title: newWorkshopData.title,
      category: newWorkshopData.category,
      facilitator: newWorkshopData.facilitator,
      facilitatorRole: newWorkshopData.facilitatorRole,
      facilitatorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      image: "https://images.unsplash.com/photo-1528458876861-544fd1761a91?w=800&auto=format&fit=crop&q=80",
      modality: newWorkshopData.modality,
      schedule: newWorkshopData.schedule,
      accessType: newWorkshopData.accessType,
      spots: Number(newWorkshopData.spots),
      spotsLeft: Number(newWorkshopData.spots),
      accessibility: [
        ...(newWorkshopData.accessibilityLesco ? ["Intérprete LESCO"] : []),
        ...(newWorkshopData.accessibilityMacrotipo ? ["Macrotipo"] : []),
        ...(newWorkshopData.accessibilityPhysical ? ["Espacio Físico Accesible"] : [])
      ],
      description: newWorkshopData.description,
      swapWanted: newWorkshopData.swapWanted || "Trueque Libre",
      status: "Activo"
    };

    setWorkshops([created, ...workshops]);
    setIsModalOpen(false);
    alert('¡Taller creado con éxito en el catálogo maestro!');
  };

  return (
    <div className="min-h-screen bg-gray-100/70 flex flex-col lg:flex-row">
      
      {/* SIDEBAR LEFT */}
      <aside className="w-full lg:w-72 bg-white border-r border-gray-200 p-6 space-y-8 shrink-0">
        
        {/* Profile Active Badge */}
        <div className="flex items-center gap-3 bg-pink-50/80 p-3.5 rounded-2xl border border-pink-100">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" 
            alt="Karla Mora" 
            className="w-11 h-11 rounded-2xl object-cover border-2 border-[#E6007E]"
          />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Karla Mora</h4>
            <span className="text-[10px] font-bold text-[#E6007E] bg-pink-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Super Administradora
            </span>
          </div>
        </div>

        {/* Sidebar Nav items */}
        <nav className="space-y-1">
          {[
            { id: 'summary', label: 'Mi Resumen / Dashboard', icon: LayoutDashboard },
            { id: 'workshops', label: 'Talleres y Cursos', icon: BookOpen },
            { id: 'users', label: 'Usuarias y Roles', icon: Users },
            { id: 'categories', label: 'Categorías e Íconos', icon: Tags },
            { id: 'swaps', label: 'Intercambios Skill-Swap', icon: RefreshCw },
            { id: 'requests', label: 'Solicitudes e Inscripciones', icon: ClipboardList },
            { id: 'faq', label: 'Preguntas Frecuentes (FAQ)', icon: HelpCircle },
            { id: 'support', label: 'Métricas de Soporte', icon: Headphones }
          ].map((item) => {
            const IconComp = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#7B008A] text-white shadow-md shadow-purple-900/20'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-[#E6007E]'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-[#A3E4D7]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="pt-6 border-t border-gray-100">
          <Boton variant="ghost" size="sm" onClick={() => setCurrentView('home')} className="w-full justify-start text-xs">
            ← Volver a la Vista Pública
          </Boton>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-x-hidden">
        
        {/* HEADER BAR */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Global Search */}
          <div className="w-full md:w-96 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar talleres, usuarias, solicitudes por folio..."
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 rounded-2xl border border-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-[#E6007E]"
            />
          </div>

          {/* Indicators */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-800 text-xs font-bold px-3 py-1.5 rounded-2xl border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Módulo Maestro - Sincronizado
            </div>

            <div className="bg-purple-50 text-[#7B008A] text-xs font-bold px-3 py-1.5 rounded-2xl border border-purple-200">
              1,248 Usuarias Registradas
            </div>

            <div className="bg-pink-50 text-[#E6007E] text-xs font-bold px-3 py-1.5 rounded-2xl border border-pink-200">
              86 Intercambios Activos
            </div>
          </div>

        </div>

        {/* METRICS & KPIS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Total Talleres Activos</span>
              <BookOpen className="w-4 h-4 text-[#E6007E]" />
            </div>
            <p className="text-3xl font-black text-gray-900">{workshops.length}</p>
            <span className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +12% este mes
            </span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Madres Capacitadas</span>
              <Users className="w-4 h-4 text-[#7B008A]" />
            </div>
            <p className="text-3xl font-black text-gray-900">1,248</p>
            <span className="text-[11px] font-bold text-purple-600">Egresadas certificadas</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Intercambios Skill-Swap</span>
              <RefreshCw className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-3xl font-black text-gray-900">412</p>
            <span className="text-[11px] font-bold text-teal-600">Trueques exitosos</span>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center text-xs font-bold text-gray-500">
              <span>Conciliación & Asistencia</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-3xl font-black text-gray-900">94.6%</p>
            <span className="text-[11px] font-bold text-amber-600">Horario flexible logrado</span>
          </div>

        </div>

        {/* AI INSIGHTS MODULE (SkillAI Insights) */}
        <div className="bg-gradient-to-r from-purple-900 via-[#7B008A] to-[#E6007E] text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md">
                <Sparkles className="w-6 h-6 text-[#A3E4D7]" />
              </div>
              <div>
                <h3 className="font-extrabold text-lg">SkillAI Insights & Conciliación Horaria</h3>
                <p className="text-xs text-pink-100">Inteligencia Artificial analizando la demanda en tiempo real.</p>
              </div>
            </div>
            <Boton variant="mint" size="sm" onClick={() => alert("¡Grupos sugeridos generados automáticamente e invitados por correo!")}>
              Crear Grupos Sugeridos
            </Boton>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="bg-[#A3E4D7] text-[#7B008A] text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase">
                Oportunidad Detectada
              </span>
              <p className="text-sm font-bold text-white">
                "Confección Matutina (+47% en búsquedas en horario de 10:00 a 12:00 hrs coincidiendo con la jornada escolar)"
              </p>
            </div>
            <span className="text-xs text-pink-200 shrink-0">Recomendación: Abrir 2 grupos extra.</span>
          </div>
        </div>

        {/* SECTION: CRUD TABLE FOR WORKSHOPS */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="text-lg font-black text-gray-900">Gestión de Talleres & Cursos</h3>
              <p className="text-xs text-gray-500">Administra el catálogo activo, asigna cupos y adaptaciones LESCO.</p>
            </div>
            <Boton variant="primary" size="md" onClick={() => setIsModalOpen(true)} icon={Plus}>
              + Crear Nuevo Taller
            </Boton>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-4 rounded-l-2xl">Taller & Cupos</th>
                  <th className="p-4">Facilitadora</th>
                  <th className="p-4">Categoría</th>
                  <th className="p-4">Modalidad / Horario</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 rounded-r-2xl text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {workshops.map((w) => (
                  <tr key={w.id} className="hover:bg-pink-50/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-gray-900">{w.title}</div>
                      <div className="text-[10px] text-gray-500">{w.spotsLeft} de {w.spots} cupos disponibles</div>
                    </td>
                    <td className="p-4 font-medium">{w.facilitator}</td>
                    <td className="p-4">{w.category}</td>
                    <td className="p-4">
                      <span className="font-semibold text-purple-900">{w.modality}</span>
                      <div className="text-[10px] text-gray-500">{w.schedule}</div>
                    </td>
                    <td className="p-4">
                      <span className="bg-pink-100 text-[#E6007E] font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {w.accessType}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {w.status || 'Activo'}
                      </span>
                    </td>
                    <td className="p-4 text-right space-x-1">
                      <button 
                        onClick={() => alert(`Editando el taller: ${w.title}`)}
                        className="p-1.5 text-gray-500 hover:text-[#7B008A] hover:bg-purple-50 rounded-xl"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteWorkshop(w.id)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION: PENDING SWAP REQUESTS VALIDATION */}
        <div className="bg-white rounded-3xl p-6 border border-pink-100 shadow-sm space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-black text-gray-900">Intercambios Skill-Swap en Espera de Validación</h3>
              <p className="text-xs text-gray-500">Revisa la equidad de las propuestas comunitarias registradas.</p>
            </div>
            <span className="bg-amber-100 text-amber-800 font-bold text-xs px-3 py-1 rounded-full">
              {swapRequests.filter(r => r.status === 'Pendiente').length} Solicitudes Pendientes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {swapRequests.map((req) => (
              <div key={req.id} className="p-5 rounded-2xl border-2 border-gray-100 bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={req.avatar} alt={req.offeredBy} className="w-10 h-10 rounded-full border border-pink-300" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{req.offeredBy}</h4>
                      <span className="text-[10px] text-gray-500">Fecha: {req.date}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    req.status === 'Aprobado' ? 'bg-emerald-100 text-emerald-800' :
                    req.status === 'Rechazado' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-gray-200">
                  <p><strong className="text-pink-600">Ofrece:</strong> {req.offeredSkill}</p>
                  <p><strong className="text-purple-600">Busca a cambio:</strong> {req.requestedSkill}</p>
                </div>

                {req.status === 'Pendiente' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleApproveSwap(req.id)}
                      className="flex-1 bg-[#2ECC71] text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Aprobar Intercambio
                    </button>
                    <button
                      onClick={() => handleRejectSwap(req.id)}
                      className="px-3 bg-red-100 text-red-700 py-2 rounded-xl text-xs font-bold hover:bg-red-200 transition-colors"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* CREATE WORKSHOP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 border-2 border-pink-200 shadow-2xl my-8">
            <div className="flex justify-between items-center border-b border-pink-100 pb-3">
              <h3 className="text-xl font-black text-gray-900">+ Publicar Nuevo Taller</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleCreateWorkshopSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Título del Taller</label>
                <input
                  type="text"
                  required
                  value={newWorkshopData.title}
                  onChange={(e) => setNewWorkshopData({ ...newWorkshopData, title: e.target.value })}
                  placeholder="ej. Taller de Costura y Confección Matutina"
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs focus:ring-2 focus:ring-[#E6007E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Categoría</label>
                  <select
                    value={newWorkshopData.category}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, category: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
                  >
                    <option value="Manualidades & Costura">Manualidades & Costura</option>
                    <option value="Repostería & Panadería">Repostería & Panadería</option>
                    <option value="Marketing Digital con Celular">Marketing Digital con Celular</option>
                    <option value="Belleza & Cuidados">Belleza & Cuidados</option>
                    <option value="Finanzas del Hogar">Finanzas del Hogar</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tipo de Acceso</label>
                  <select
                    value={newWorkshopData.accessType}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, accessType: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
                  >
                    <option value="Skill-Swap">Skill-Swap (Trueque)</option>
                    <option value="Gratuito">Gratuito</option>
                    <option value="Sustentable">Sustentable</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Modalidad</label>
                  <select
                    value={newWorkshopData.modality}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, modality: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
                  >
                    <option value="Virtual">Virtual</option>
                    <option value="Presencial">Presencial</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Cupos Totales</label>
                  <input
                    type="number"
                    min="1"
                    value={newWorkshopData.spots}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, spots: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Horario Compatible (Siesta/Escolar)</label>
                <input
                  type="text"
                  required
                  value={newWorkshopData.schedule}
                  onChange={(e) => setNewWorkshopData({ ...newWorkshopData, schedule: e.target.value })}
                  placeholder="ej. Mar y Jue (10:00 - 11:30 AM) - Horario Siesta"
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Descripción Breve</label>
                <textarea
                  rows="3"
                  value={newWorkshopData.description}
                  onChange={(e) => setNewWorkshopData({ ...newWorkshopData, description: e.target.value })}
                  placeholder="Detalla lo que enseñaras en el taller..."
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs"
                />
              </div>

              {/* Adaptaciones de Accesibilidad */}
              <div className="space-y-2 bg-pink-50 p-4 rounded-2xl border border-pink-100">
                <span className="font-bold text-gray-800 block">Adaptaciones de Accesibilidad:</span>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newWorkshopData.accessibilityLesco}
                      onChange={(e) => setNewWorkshopData({ ...newWorkshopData, accessibilityLesco: e.target.checked })}
                    />
                    <span>Lengua de Señas LESCO</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newWorkshopData.accessibilityMacrotipo}
                      onChange={(e) => setNewWorkshopData({ ...newWorkshopData, accessibilityMacrotipo: e.target.checked })}
                    />
                    <span>Macrotipo / Subtítulos</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={newWorkshopData.accessibilityPhysical}
                      onChange={(e) => setNewWorkshopData({ ...newWorkshopData, accessibilityPhysical: e.target.checked })}
                    />
                    <span>Espacio Físico Accesible</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <Boton variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Boton>
                <Boton variant="primary" size="sm" type="submit">
                  Guardar y Publicar
                </Boton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
