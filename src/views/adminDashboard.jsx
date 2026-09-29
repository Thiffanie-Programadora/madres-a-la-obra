import React, { useState } from 'react';
import { 
  LayoutDashboard, BookOpen, Users, Tags, RefreshCw, ClipboardList, 
  HelpCircle, Headphones, Search, Bell, Sparkles, Plus, CheckCircle, 
  XCircle, Edit, Trash2, ArrowUpRight, TrendingUp, AlertCircle, Eye, 
  Volume2, ShieldAlert, Check, Award
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Boton from '../components/boton';
import AdminLayout from '../components/common/AdminLayout';
import { crearTaller, eliminarTaller } from '../services/talleresService';

export default function AdminDashboard({ 
  workshops, 
  setWorkshops, 
  swapRequests, 
  setSwapRequests, 
  setCurrentView 
}) {
  const [activeTab, setActiveTab] = useState('summary');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingWorkshop, setEditingWorkshop] = useState(null);

  // Certificados State con manejo seguro
  const [certificados, setCertificados] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('madres_certificados') || '[]');
    } catch {
      return [];
    }
  });

  // Recharts Chart Data
  const chartData = [
    { name: 'Manualidades & Costura', solicitadas: 342, color: '#E6007E' },
    { name: 'Repostería & Panadería', solicitadas: 260, color: '#7B008A' },
    { name: 'Marketing Digital', solicitadas: 185, color: '#A3E4D7' },
    { name: 'Belleza & Cuidados', solicitadas: 120, color: '#2ECC71' },
    { name: 'Finanzas del Hogar', solicitadas: 88, color: '#F39C12' }
  ];

  // Modal State for New Workshop
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkshopData, setNewWorkshopData] = useState({
    title: '',
    category: 'Manualidades & Costura',
    facilitator: 'Thifanie B Mora',
    facilitatorRole: 'Docente y Mamá Cuidadora',
    modality: 'Virtual',
    schedule: 'Mar y Jue (10:00 - 11:30 AM)',
    accessType: 'Skill-Swap',
    spots: 15,
    description: '',
    swapWanted: '',
    videoUrl: '',
    slidesUrl: '',
    meetingUrl: '',
    accessibilityLesco: true,
    accessibilityMacrotipo: true,
    accessibilityPhysical: false
  });

  const handleCreateUserQuick = () => {
    if (setCurrentView) {
      setCurrentView('admin');
    }
    window.location.href = '/admin/usuarios';
  };

  const handleApproveSwap = (id) => {
    setSwapRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Aprobado' } : req));
  };

  const handleRejectSwap = (id) => {
    const feedback = prompt('Motivo o retroalimentación del rechazo:');
    setSwapRequests(prev => prev.map(req => req.id === id ? { ...req, status: 'Rechazado', feedback: feedback || 'Rechazado por moderación' } : req));
  };

  const handleApproveCertificado = (certId, nombreEstudiante) => {
    const updated = certificados.map(c => c.id === certId ? { ...c, estado: 'Aprobado' } : c);
    setCertificados(updated);
    localStorage.setItem('madres_certificados', JSON.stringify(updated));
    alert(`¡Certificado emitido con éxito para ${nombreEstudiante}!`);
  };

  const handleRejectCertificado = (certId) => {
    const updated = certificados.map(c => c.id === certId ? { ...c, estado: 'Rechazado' } : c);
    setCertificados(updated);
    localStorage.setItem('madres_certificados', JSON.stringify(updated));
  };

  const handleDeleteWorkshop = async (id) => {
    if (confirm('¿Estás segura de eliminar este taller del directorio?')) {
      await eliminarTaller(id);
      setWorkshops(prev => prev.filter(w => w.id !== id));
    }
  };

  const handleCreateWorkshopSubmit = async (e) => {
    e.preventDefault();
    const createdData = {
      id: Date.now().toString(),
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
      videoUrl: newWorkshopData.videoUrl,
      slidesUrl: newWorkshopData.slidesUrl,
      meetingUrl: newWorkshopData.meetingUrl,
      accessibility: [
        ...(newWorkshopData.accessibilityLesco ? ["Intérprete LESCO"] : []),
        ...(newWorkshopData.accessibilityMacrotipo ? ["Macrotipo"] : []),
        ...(newWorkshopData.accessibilityPhysical ? ["Espacio Físico Accesible"] : [])
      ],
      description: newWorkshopData.description,
      swapWanted: newWorkshopData.swapWanted || "Trueque Libre",
      status: "aprobado"
    };

    const result = await crearTaller(createdData);
    setWorkshops([result || createdData, ...workshops]);
    setIsModalOpen(false);
    alert('¡Taller creado con éxito en el catálogo maestro!');
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* HEADER BAR */}
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
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

          <div className="flex flex-wrap items-center gap-3">
            <Boton variant="mint" size="xs" onClick={handleCreateUserQuick}>
              + Crear Nuevo Usuario
            </Boton>
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

        {/* VISUALIZATION CHART & SKILLAI INSIGHTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Recharts Bar Chart Container */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-extrabold text-gray-900 text-base">Categorías Más Solicitadas</h3>
              <span className="text-xs text-gray-500">Actualizado en vivo</span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <Tooltip />
                  <Bar dataKey="solicitadas" fill="#E6007E" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="lg:col-span-5 bg-gradient-to-r from-purple-900 to-[#7B008A] text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#A3E4D7]" />
                <h4 className="font-black text-sm">SkillAI Insights & Demanda</h4>
              </div>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 space-y-2">
                <span className="bg-[#A3E4D7] text-[#7B008A] text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Oportunidad Detectada
                </span>
                <p className="text-xs text-pink-100 font-medium leading-relaxed">
                  "Confección Matutina (+47% en búsquedas en horario de 10:00 a 12:00 hrs coincidiendo con la jornada escolar)."
                </p>
              </div>
            </div>
            <Boton variant="mint" size="sm" onClick={() => alert("¡Grupos sugeridos generados e invitados!")}>
              Crear Grupos Sugeridos
            </Boton>
          </div>

        </div>

        {/* SECTION: PENDING SWAP REQUESTS VALIDATION (PRIORIDAD AL INICIAR SESION) */}
        <div className="bg-white rounded-3xl p-6 border-2 border-pink-300 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-pink-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
                <h3 className="text-xl font-black text-gray-900">Solicitudes e Inscripciones en Espera de Validación</h3>
              </div>
              <p className="text-xs text-gray-500">Revisa y aprueba prioritariamente las propuestas de trueque e inscripciones enviadas por las usuarias.</p>
            </div>
            <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-4 py-1.5 rounded-full border border-amber-300">
              {swapRequests.filter(r => r.status === 'Pendiente').length} Solicitudes Pendientes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {swapRequests
              .filter(req => {
                if (!searchQuery.trim()) return true;
                const q = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const offeredBy = (req.offeredBy || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const offeredSkill = (req.offeredSkill || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                const requestedSkill = (req.requestedSkill || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                return offeredBy.includes(q) || offeredSkill.includes(q) || requestedSkill.includes(q);
              })
              .map((req) => (

              <div key={req.id} className="p-5 rounded-2xl border-2 border-pink-100 bg-gradient-to-br from-pink-50/40 to-purple-50/40 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={req.avatar} alt={req.offeredBy} className="w-10 h-10 rounded-full border-2 border-[#E6007E]" />
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">{req.offeredBy}</h4>
                      <span className="text-[10px] text-gray-500">Fecha: {req.date}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                    req.status === 'Aprobado' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    req.status === 'Rechazado' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-pink-100 shadow-xs">
                  <p><strong className="text-[#E6007E]">Detalle / Ofrece:</strong> {req.offeredSkill}</p>
                  <p><strong className="text-[#7B008A]">Trámite / Solicita:</strong> {req.requestedSkill}</p>
                </div>

                {req.status === 'Pendiente' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleApproveSwap(req.id)}
                      className="flex-1 bg-[#2ECC71] hover:bg-emerald-600 text-white py-2 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Check className="w-4 h-4" /> Aprobar Solicitud
                    </button>
                    <button
                      onClick={() => handleRejectSwap(req.id)}
                      className="px-4 bg-red-100 text-red-700 py-2 rounded-xl text-xs font-bold hover:bg-red-200 transition-colors"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION: CERTIFICADOS DE FINALIZACION PENDIENTES DE APROBACION */}
        <div className="bg-white rounded-3xl p-6 border-2 border-purple-300 shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-purple-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#7B008A]" />
                <h3 className="text-xl font-black text-gray-900">Solicitudes de Certificados de Finalización</h3>
              </div>
              <p className="text-xs text-gray-500">Solo la Administración puede revisar y emitir los certificados oficiales solicitados por las estudiantes.</p>
            </div>
            <span className="bg-purple-100 text-[#7B008A] font-extrabold text-xs px-4 py-1.5 rounded-full border border-purple-300">
              {certificados.filter(c => c.estado === 'Pendiente').length} Certificados Pendientes
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certificados.map((cert) => (
              <div key={cert.id} className="p-5 rounded-2xl border-2 border-purple-100 bg-gradient-to-br from-purple-50/40 to-pink-50/40 space-y-3 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-extrabold text-sm text-gray-900">{cert.estudianteNombre}</h4>
                    <span className="text-[10px] text-gray-500">{cert.estudianteEmail}</span>
                  </div>
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full ${
                    cert.estado === 'Aprobado' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                    cert.estado === 'Rechazado' ? 'bg-red-100 text-red-800 border border-red-300' : 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                  }`}>
                    {cert.estado}
                  </span>
                </div>

                <div className="text-xs space-y-1 bg-white p-3 rounded-xl border border-purple-100">
                  <p><strong className="text-[#7B008A]">Curso Solicitado:</strong> {cert.cursoTitulo}</p>
                  <p className="text-[10px] text-gray-400">Fecha de Solicitud: {cert.fechaSolicitud}</p>
                </div>

                {cert.estado === 'Pendiente' && (
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => handleApproveCertificado(cert.id, cert.estudianteNombre)}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-black transition-colors flex items-center justify-center gap-1 shadow-sm"
                    >
                      <Award className="w-4 h-4" /> Aprobar & Emitir Certificado
                    </button>
                    <button
                      onClick={() => handleRejectCertificado(cert.id)}
                      className="px-3 bg-red-100 text-red-700 py-2 rounded-xl text-xs font-bold hover:bg-red-200 transition-colors"
                    >
                      Rechazar
                    </button>
                  </div>
                )}
              </div>
            ))}

            {certificados.length === 0 && (
              <p className="text-xs text-gray-500 text-center col-span-2 py-4">No hay solicitudes de certificados pendientes por el momento.</p>
            )}
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
                {workshops
                  .filter(w => {
                    if (!searchQuery.trim()) return true;
                    const q = searchQuery.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const title = (w.title || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const fac = (w.facilitator || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const cat = (w.category || '').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const id = (w.id || '').toString().toLowerCase();
                    return title.includes(q) || fac.includes(q) || cat.includes(q) || id.includes(q);
                  })
                  .map((w) => (

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
                        onClick={() => setEditingWorkshop(w)}
                        title="Coordinar Horario, Fechas y Cupos"
                        className="p-1.5 text-gray-500 hover:text-[#7B008A] hover:bg-purple-50 rounded-xl flex items-center gap-1 font-bold text-[11px]"
                      >
                        <Edit className="w-4 h-4" /> Coordinar
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
                <label className="block font-bold text-gray-700 mb-1">Horario & Fecha Compatible (Siesta/Escolar/Inicio)</label>
                <input
                  type="text"
                  required
                  value={newWorkshopData.schedule}
                  onChange={(e) => setNewWorkshopData({ ...newWorkshopData, schedule: e.target.value })}
                  placeholder="ej. Inicia 15 Oct - Mar y Jue (10:00 - 11:30 AM)"
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

              {/* Material Didáctico y Formato Virtual */}
              <div className="space-y-3 bg-purple-50 p-4 rounded-2xl border border-purple-100">
                <span className="font-bold text-[#7B008A] block">Material Didáctico y Aula Virtual (Enlaces):</span>
                <div>
                  <label className="block text-[11px] font-semibold text-gray-700 mb-1">Enlace a Clase en Video (YouTube / Loom / Drive)</label>
                  <input
                    type="url"
                    value={newWorkshopData.videoUrl}
                    onChange={(e) => setNewWorkshopData({ ...newWorkshopData, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-xs"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Diapositivas / Guía (PDF / Drive)</label>
                    <input
                      type="url"
                      value={newWorkshopData.slidesUrl}
                      onChange={(e) => setNewWorkshopData({ ...newWorkshopData, slidesUrl: e.target.value })}
                      placeholder="https://docs.google.com/presentation/..."
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-gray-700 mb-1">Sala de Reunión (Meet / Zoom)</label>
                    <input
                      type="url"
                      value={newWorkshopData.meetingUrl}
                      onChange={(e) => setNewWorkshopData({ ...newWorkshopData, meetingUrl: e.target.value })}
                      placeholder="https://meet.google.com/..."
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-200 text-xs"
                    />
                  </div>
                </div>
              </div>

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

      {/* EDIT/COORDINATE WORKSHOP MODAL */}
      {editingWorkshop && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border-2 border-pink-200 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-pink-100 pb-3">
              <h3 className="text-xl font-black text-gray-900">Coordinar Curso: {editingWorkshop.title}</h3>
              <button onClick={() => setEditingWorkshop(null)} className="text-gray-400 hover:text-gray-600 font-bold">
                ✕
              </button>
            </div>

            <form 
              onSubmit={(e) => {
                e.preventDefault();
                setWorkshops(prev => prev.map(item => item.id === editingWorkshop.id ? editingWorkshop : item));
                alert(`¡Curso "${editingWorkshop.title}" coordinado exitosamente!`);
                setEditingWorkshop(null);
              }} 
              className="space-y-4 text-xs"
            >
              <div>
                <label className="block font-bold text-gray-700 mb-1">Días y Horarios Coordinados</label>
                <input
                  type="text"
                  required
                  value={editingWorkshop.schedule || ''}
                  onChange={(e) => setEditingWorkshop({ ...editingWorkshop, schedule: e.target.value })}
                  placeholder="ej. Inicia 15 Oct - Mar y Jue (10:00 - 11:30 AM)"
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Cupos Disponibles Libres</label>
                  <input
                    type="number"
                    min="0"
                    value={editingWorkshop.spotsLeft || 0}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, spotsLeft: Number(e.target.value) })}
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Cupos Totales de Aula</label>
                  <input
                    type="number"
                    min="1"
                    value={editingWorkshop.spots || 0}
                    onChange={(e) => setEditingWorkshop({ ...editingWorkshop, spots: Number(e.target.value) })}
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Modalidad de Impartición</label>
                <select
                  value={editingWorkshop.modality || 'Virtual'}
                  onChange={(e) => setEditingWorkshop({ ...editingWorkshop, modality: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 font-medium"
                >
                  <option value="Virtual">Virtual (En línea)</option>
                  <option value="Presencial">Presencial (Sede Comunitaria)</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <Boton variant="ghost" size="sm" type="button" onClick={() => setEditingWorkshop(null)}>
                  Cancelar
                </Boton>
                <Boton variant="primary" size="sm" type="submit">
                  Guardar Coordinación
                </Boton>
              </div>
            </form>
          </div>
        </div>
      )}

      </div>
    </AdminLayout>
  );
}
