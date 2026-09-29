import React from 'react';
import { X, Video, ExternalLink, Presentation, Monitor } from 'lucide-react';
import Boton from './boton';

export default function WorkshopDetailModal({ workshop, onClose, onRegister }) {
  if (!workshop) return null;

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      return url.replace('watch?v=', 'embed/');
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  };

  const embedVideoUrl = getEmbedUrl(workshop.videoUrl);

  const [showRequestForm, setShowRequestForm] = React.useState(false);
  const [modalidadSolicitud, setModalidadSolicitud] = React.useState('inscripcion'); // 'inscripcion' | 'trueque'
  const [applicantData, setApplicantData] = React.useState({
    nombre: '',
    email: '',
    mensaje: '',
    cursoOfrecido: '',
    cursoInteres: workshop.title || ''
  });

  const [isSuccessMessage, setIsSuccessMessage] = React.useState(false);

  const handleSendRequest = (e) => {
    e.preventDefault();
    onRegister({
      ...workshop,
      tipoTramite: modalidadSolicitud === 'trueque' ? 'Trueque de Conocimiento' : 'Inscripción Directa',
      solicitanteNombre: applicantData.nombre,
      solicitanteEmail: applicantData.email,
      solicitanteMensaje: applicantData.mensaje,
      solicitanteTrueque: modalidadSolicitud === 'trueque' ? `Ofrece: ${applicantData.cursoOfrecido} | Interés: ${applicantData.cursoInteres}` : 'Inscripción Estándar',
      fechaSolicitud: new Date().toLocaleDateString()
    });
    setIsSuccessMessage(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 border-2 border-pink-200 shadow-2xl relative my-8">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold">
          <X className="w-6 h-6" />
        </button>

        <div className="relative h-48 rounded-2xl overflow-hidden">
          <img src={workshop.image} alt={workshop.title} className="w-full h-full object-cover" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-[#7B008A] text-white font-bold text-xs px-3 py-1 rounded-full">
              {workshop.modality || 'Virtual'}
            </span>
            <span className="bg-[#A3E4D7] text-[#7B008A] font-extrabold text-xs px-3 py-1 rounded-full">
              {workshop.accessType}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            {(workshop.accessibility || []).map((acc, i) => (
              <span key={i} className="text-[10px] bg-purple-50 text-[#7B008A] font-bold px-2.5 py-1 rounded-full border border-purple-200">
                {acc}
              </span>
            ))}
          </div>

          <h2 className="text-2xl font-black text-gray-900">{workshop.title}</h2>

          <div className="flex items-center gap-3 bg-pink-50 p-3 rounded-2xl border border-pink-100 text-xs">
            <img src={workshop.facilitatorAvatar} alt={workshop.facilitator} className="w-10 h-10 rounded-full border border-[#E6007E]" />
            <div>
              <p className="font-bold text-gray-900">{workshop.facilitator}</p>
              <p className="text-[11px] text-gray-500">{workshop.facilitatorRole}</p>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
            {workshop.description}
          </p>

          <div className="bg-gray-50 p-4 rounded-2xl space-y-1.5 text-xs text-gray-700">
            <p><strong>Horario Compatible:</strong> {workshop.schedule}</p>
            <p><strong>Cupos Disponibles:</strong> {workshop.spotsLeft} de {workshop.spots}</p>
          </div>

          {/* Formulario Dinámico (Inscripción / Trueque) */}
          {isSuccessMessage ? (
            <div className="bg-emerald-50 p-6 rounded-3xl border-2 border-emerald-200 text-center space-y-4">
              <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto font-bold text-xl">
                ✓
              </div>
              <h3 className="text-lg font-black text-emerald-950">¡Solicitud Enviada a Administración!</h3>
              <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                Tu solicitud de <strong>{modalidadSolicitud === 'trueque' ? 'Trueque' : 'Inscripción'}</strong> para el taller <strong>"{workshop.title}"</strong> ha sido registrada exitosamente. La administración la revisará en breve.
              </p>
              <Boton variant="primary" size="sm" onClick={onClose} className="mt-2">
                Entendido / Cerrar
              </Boton>
            </div>
          ) : showRequestForm ? (
            <form onSubmit={handleSendRequest} className="bg-pink-50/60 p-5 rounded-3xl border-2 border-pink-200 space-y-4 text-xs">
              <div className="flex justify-between items-center border-b border-pink-200 pb-3">
                <h3 className="font-black text-sm text-[#7B008A]">Formulario de Solicitud</h3>
                <span className="text-[11px] text-gray-500">Selecciona el tipo de trámite:</span>
              </div>

              {/* Selector si es Inscripción o Trueque */}
              <div className="grid grid-cols-2 gap-3 bg-white p-1.5 rounded-2xl border border-pink-200">
                <button
                  type="button"
                  onClick={() => setModalidadSolicitud('inscripcion')}
                  className={`py-2.5 rounded-xl font-bold transition-all text-xs ${
                    modalidadSolicitud === 'inscripcion'
                      ? 'bg-[#E6007E] text-white shadow-md'
                      : 'text-gray-600 hover:bg-pink-50'
                  }`}
                >
                  Solicitud de Inscripción
                </button>
                <button
                  type="button"
                  onClick={() => setModalidadSolicitud('trueque')}
                  className={`py-2.5 rounded-xl font-bold transition-all text-xs ${
                    modalidadSolicitud === 'trueque'
                      ? 'bg-[#7B008A] text-white shadow-md'
                      : 'text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  Solicitud de Trueque
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Nombre Completo del Solicitante</label>
                  <input
                    type="text"
                    required
                    value={applicantData.nombre}
                    onChange={(e) => setApplicantData({ ...applicantData, nombre: e.target.value })}
                    placeholder="ej. Ana María Torres"
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-200"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Correo Electrónico de Contacto</label>
                  <input
                    type="email"
                    required
                    value={applicantData.email}
                    onChange={(e) => setApplicantData({ ...applicantData, email: e.target.value })}
                    placeholder="ana@ejemplo.com"
                    className="w-full p-2.5 rounded-xl bg-white border border-gray-200"
                  />
                </div>
              </div>

              {/* Campos dinámicos si es TRUEQUE */}
              {modalidadSolicitud === 'trueque' ? (
                <div className="space-y-3 bg-purple-50/70 p-3.5 rounded-2xl border border-purple-200">
                  <div>
                    <label className="block font-bold text-[#7B008A] mb-1">Curso o Habilidad que Ofreces para el Trueque</label>
                    <input
                      type="text"
                      required
                      value={applicantData.cursoOfrecido}
                      onChange={(e) => setApplicantData({ ...applicantData, cursoOfrecido: e.target.value })}
                      placeholder="ej. Taller de Costura Básica / Clases de Inglés"
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#7B008A] mb-1">Curso en el que estás Interesado a Cambio</label>
                    <input
                      type="text"
                      required
                      value={applicantData.cursoInteres}
                      onChange={(e) => setApplicantData({ ...applicantData, cursoInteres: e.target.value })}
                      placeholder="ej. Taller de Repostería Creativa"
                      className="w-full p-2.5 rounded-xl bg-white border border-gray-200"
                    />
                  </div>
                </div>
              ) : null}

              <div>
                <label className="block font-bold text-gray-700 mb-1">Comentarios / Información Adicional</label>
                <textarea
                  rows="2"
                  value={applicantData.mensaje}
                  onChange={(e) => setApplicantData({ ...applicantData, mensaje: e.target.value })}
                  placeholder="Detalla cualquier información adicional sobre tu solicitud..."
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Boton variant="ghost" size="sm" type="button" onClick={() => setShowRequestForm(false)}>
                  Cancelar Formulario
                </Boton>
                <Boton variant="primary" size="sm" type="submit">
                  Enviar Solicitud a Administración
                </Boton>
              </div>
            </form>
          ) : null}
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-gray-100">
          <Boton variant="ghost" size="sm" onClick={onClose}>
            Cerrar
          </Boton>
          {!showRequestForm && (
            <Boton variant="primary" size="md" onClick={() => setShowRequestForm(true)}>
              📝 Llenar Formulario
            </Boton>
          )}
        </div>


      </div>
    </div>
  );

}
