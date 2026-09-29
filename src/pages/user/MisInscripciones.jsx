import React, { useState } from 'react';
import { 
  BookOpen, Clock, CheckCircle2, Upload, FileCheck, Award, 
  Video, FileText, Calendar, PlusCircle, AlertCircle, Sparkles, Send, Check
} from 'lucide-react';
import Boton from '../../components/boton';
import { useAuth } from '../../hooks/useAuth';

export default function MisInscripciones({ workshops = [] }) {
  const { user } = useAuth();
  
  // Dynamic list of enrolled courses with progress & schedules
  const [cursos, setCursos] = useState([
    {
      id: "c1",
      titulo: "Confección y Costura Básica para Emprender",
      facilitadora: "Karla Mora",
      horario: "Mar y Jue (10:00 - 11:30 AM) - Horario Siesta",
      modalidad: "Virtual",
      progreso: 80,
      clasesTotal: 5,
      clasesVistas: 4,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slidesUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      certificadoEstado: "no_solicitado" // 'no_solicitado' | 'pendiente' | 'aprobado'
    },
    {
      id: "c2",
      titulo: "Marketing Digital con Celular para Mamás",
      facilitadora: "Sofía Bermúdez",
      horario: "Lun y Mié (02:00 - 03:30 PM) - Jornada Escolar",
      modalidad: "Virtual",
      progreso: 40,
      clasesTotal: 6,
      clasesVistas: 2,
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      slidesUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      certificadoEstado: "no_solicitado"
    }
  ]);

  // Skill Swap Upload State (Clases de Trueque que la estudiante imparte/sube)
  const [truequeClases, setTruequeClases] = useState([
    {
      id: "t1",
      tituloClase: "Recetas Rápidas de Galletas sin Horno",
      categoria: "Repostería",
      fechaSubida: "2026-09-24",
      enlaceVideo: "https://youtube.com/...",
      estado: "Publicada"
    }
  ]);

  const [nuevoTrueque, setNuevoTrueque] = useState({
    tituloClase: '',
    categoria: 'Repostería',
    enlaceVideo: '',
    descripcion: ''
  });
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Certificados Solicitados State
  const [certificados, setCertificados] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('madres_certificados') || '[]');
    } catch {
      return [];
    }
  });

  const [solicitudEnviada, setSolicitudEnviada] = useState(null);

  const handleSubirTrueque = (e) => {
    e.preventDefault();
    const claseCreada = {
      id: `t_${Date.now()}`,
      tituloClase: nuevoTrueque.tituloClase,
      categoria: nuevoTrueque.categoria,
      enlaceVideo: nuevoTrueque.enlaceVideo,
      fechaSubida: new Date().toISOString().split('T')[0],
      estado: "Publicada"
    };
    setTruequeClases([claseCreada, ...truequeClases]);
    setShowUploadModal(false);
    setNuevoTrueque({ tituloClase: '', categoria: 'Repostería', enlaceVideo: '', descripcion: '' });
  };

  const handleSolicitarCertificado = (curso) => {
    const existe = certificados.some(c => c.cursoId === curso.id && c.estudianteEmail === user?.email);
    if (existe) {
      setSolicitudEnviada(`Ya habías enviado una solicitud previa para "${curso.titulo}". Está pendiente de revisión por Administración.`);
      return;
    }

    const nuevaSolicitud = {
      id: `cert_${Date.now()}`,
      cursoId: curso.id,
      cursoTitulo: curso.titulo,
      estudianteNombre: user?.nombre || "Estudiante",
      estudianteEmail: user?.email || "estudiante@madresalaobra.com",
      fechaSolicitud: new Date().toLocaleDateString(),
      estado: "Pendiente" // 'Pendiente' | 'Aprobado' | 'Rechazado'
    };

    const actualizados = [nuevaSolicitud, ...certificados];
    setCertificados(actualizados);
    localStorage.setItem('madres_certificados', JSON.stringify(actualizados));

    // Actualizar estado local del curso
    setCursos(cursos.map(c => c.id === curso.id ? { ...c, certificadoEstado: 'pendiente' } : c));
    setSolicitudEnviada(`¡Solicitud enviada a la Administración para el certificado de "${curso.titulo}"!`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-12">
      
      {/* HEADER BANNER */}
      <div className="bg-gradient-to-r from-[#7B008A] via-[#E6007E] to-[#7B008A] text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-3">
        <div className="flex items-center gap-2">
          <span className="bg-[#A3E4D7] text-[#7B008A] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider">
            Portal del Estudiante
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black">Mi Aula Virtual & Mis Cursos</h1>
        <p className="text-xs sm:text-sm text-pink-100 max-w-2xl leading-relaxed">
          Consulta los horarios de tus clases en vivo, revisa tu avance por lección, sube tus propias clases de trueque y solicita tu certificado oficial firmado por Administración.
        </p>
      </div>

      {solicitudEnviada && (
        <div className="bg-emerald-50 border-2 border-emerald-300 text-emerald-950 p-4 rounded-2xl text-xs font-bold flex justify-between items-center">
          <span className="flex items-center gap-2">
            <Check className="w-5 h-5 text-emerald-600 shrink-0" />
            {solicitudEnviada}
          </span>
          <button onClick={() => setSolicitudEnviada(null)} className="text-emerald-700 hover:text-emerald-900 font-extrabold">✕</button>
        </div>
      )}

      {/* SECCIÓN 1: MIS CURSOS INSCRITOS, HORARIOS Y CLASES */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-pink-100 pb-3">
          <div>
            <span className="text-xs font-bold text-[#E6007E] uppercase">Mis Asignaturas</span>
            <h2 className="text-2xl font-black text-gray-900">Cursos en Curso & Horarios</h2>
          </div>
          <span className="text-xs text-gray-500 font-medium">{cursos.length} Cursos Inscritos</span>
        </div>

        <div className="space-y-6">
          {cursos.map((curso) => {
            const certStatus = certificados.find(c => c.cursoId === curso.id && c.estudianteEmail === user?.email)?.estado || curso.certificadoEstado;

            return (
              <div key={curso.id} className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-pink-100 shadow-sm space-y-6">
                
                {/* Course Main Details */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="bg-purple-100 text-[#7B008A] font-extrabold text-[10px] px-3 py-0.5 rounded-full uppercase">
                        {curso.modalidad}
                      </span>
                      <span className="bg-pink-100 text-[#E6007E] font-bold text-[10px] px-3 py-0.5 rounded-full">
                        {curso.clasesVistas} de {curso.clasesTotal} Clases Completadas
                      </span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900">{curso.titulo}</h3>
                    <p className="text-xs text-gray-600">Facilitadora a cargo: <strong>{curso.facilitadora}</strong></p>
                  </div>

                  <div className="flex items-center gap-2 bg-pink-50 p-3 rounded-2xl border border-pink-200 text-xs">
                    <Clock className="w-5 h-5 text-[#E6007E] shrink-0" />
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 block uppercase">Horario Asignado</span>
                      <strong className="text-gray-800">{curso.horario}</strong>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-700">Progreso del Curso</span>
                    <span className="text-[#E6007E]">{curso.progreso}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5 border border-gray-200">
                    <div 
                      className="bg-gradient-to-r from-[#E6007E] to-[#7B008A] h-full rounded-full transition-all duration-500"
                      style={{ width: `${curso.progreso}%` }}
                    />
                  </div>
                </div>

                {/* Class Material & Classroom Buttons */}
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <a 
                      href={curso.videoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 text-[#7B008A] font-bold hover:underline"
                    >
                      <Video className="w-4 h-4 text-[#E6007E]" /> Ver Clases Grabadas (YouTube)
                    </a>
                    <a 
                      href={curso.slidesUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 text-gray-700 font-bold hover:underline"
                    >
                      <FileText className="w-4 h-4 text-purple-600" /> Descargar Guías & Material (PDF)
                    </a>
                  </div>

                  {/* Certificado Request Action */}
                  <div className="pt-2 sm:pt-0">
                    {certStatus === 'Aprobado' ? (
                      <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-1">
                        <Award className="w-4 h-4 text-emerald-600" /> Certificado Emitido por Admin ✓
                      </span>
                    ) : certStatus === 'Pendiente' || certStatus === 'pendiente' ? (
                      <span className="bg-amber-100 text-amber-900 border border-amber-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1">
                        <Clock className="w-4 h-4 text-amber-600" /> Certificado en Revisión por Admin
                      </span>
                    ) : (
                      <Boton 
                        variant="mint" 
                        size="sm" 
                        onClick={() => handleSolicitarCertificado(curso)}
                        icon={Award}
                      >
                        Solicitar Certificado de Finalización
                      </Boton>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN 2: SUBIR MIS CLASES DE TRUEQUE */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-pink-100 pb-4">
          <div>
            <span className="text-xs font-bold text-[#7B008A] uppercase">Red Comunitaria de Aprendizaje</span>
            <h2 className="text-2xl font-black text-gray-900">Subir mis Clases de Trueque</h2>
            <p className="text-xs text-gray-500">Comparte tus saberes en video con otras madres de la comunidad.</p>
          </div>
          <Boton variant="primary" size="md" onClick={() => setShowUploadModal(true)} icon={Upload}>
            + Subir Nueva Clase de Trueque
          </Boton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {truequeClases.map((tc) => (
            <div key={tc.id} className="p-5 rounded-2xl border-2 border-purple-100 bg-purple-50/40 space-y-3">
              <div className="flex justify-between items-center">
                <span className="bg-[#7B008A] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {tc.categoria}
                </span>
                <span className="text-[10px] text-gray-500">Subido: {tc.fechaSubida}</span>
              </div>
              <h4 className="font-extrabold text-sm text-gray-900">{tc.tituloClase}</h4>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-purple-100">
                <span className="text-emerald-700 font-bold">Estado: {tc.estado}</span>
                <a href={tc.enlaceVideo} target="_blank" rel="noopener noreferrer" className="text-[#E6007E] font-bold hover:underline">
                  Ver Video ➔
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL SUBIR CLASE DE TRUEQUE */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border-2 border-pink-200 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-pink-100 pb-2">
              <h3 className="text-lg font-black text-gray-900">+ Subir Clase de Trueque</h3>
              <button onClick={() => setShowUploadModal(false)} className="text-gray-400 hover:text-gray-600 font-bold">✕</button>
            </div>

            <form onSubmit={handleSubirTrueque} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Título de la Clase / Video</label>
                <input
                  type="text"
                  required
                  value={nuevoTrueque.tituloClase}
                  onChange={(e) => setNuevoTrueque({ ...nuevoTrueque, tituloClase: e.target.value })}
                  placeholder="ej. Taller de Arreglos Rápidos en Costura"
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Categoría</label>
                <select
                  value={nuevoTrueque.categoria}
                  onChange={(e) => setNuevoTrueque({ ...nuevoTrueque, categoria: e.target.value })}
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 font-medium"
                >
                  <option value="Manualidades & Costura">Manualidades & Costura</option>
                  <option value="Repostería & Panadería">Repostería & Panadería</option>
                  <option value="Marketing Digital con Celular">Marketing Digital con Celular</option>
                  <option value="Belleza & Cuidados">Belleza & Cuidados</option>
                  <option value="Finanzas del Hogar">Finanzas del Hogar</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Enlace del Video (YouTube / Loom / Drive)</label>
                <input
                  type="url"
                  required
                  value={nuevoTrueque.enlaceVideo}
                  onChange={(e) => setNuevoTrueque({ ...nuevoTrueque, enlaceVideo: e.target.value })}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Boton variant="ghost" size="sm" type="button" onClick={() => setShowUploadModal(false)}>
                  Cancelar
                </Boton>
                <Boton variant="primary" size="sm" type="submit">
                  Publicar Clase
                </Boton>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
