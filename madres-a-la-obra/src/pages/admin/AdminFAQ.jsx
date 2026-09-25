import React, { useState, useEffect } from 'react';
import { HelpCircle, Trash2 } from 'lucide-react';
import Boton from '../../components/boton';
import { obtenerFaq, crearFaq, eliminarFaq } from '../../services/faqService';

export default function AdminFAQ() {
  const [faqs, setFaqs] = useState([]);
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');

  useEffect(() => {
    obtenerFaq().then(data => setFaqs(data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!pregunta || !respuesta) return;
    const nueva = await crearFaq({ pregunta, respuesta });
    setFaqs([...faqs, nueva]);
    setPregunta('');
    setRespuesta('');
    alert('Pregunta FAQ creada con éxito.');
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar esta pregunta frecuente del centro de ayuda?')) {
      await eliminarFaq(id);
      setFaqs(prev => prev.filter(f => f.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900">CRUD de Preguntas Frecuentes (FAQ)</h1>
          <p className="text-xs text-gray-500">Crea, edita y elimina respuestas de ayuda para la comunidad.</p>
        </div>
      </div>

      <form onSubmit={handleCreate} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3 text-xs">
        <h3 className="font-bold text-sm text-gray-800">+ Agregar Pregunta Frecuente</h3>
        <input
          type="text"
          required
          placeholder="Pregunta..."
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
        />
        <textarea
          rows="2"
          required
          placeholder="Respuesta explicativa..."
          value={respuesta}
          onChange={(e) => setRespuesta(e.target.value)}
          className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
        />
        <Boton variant="primary" size="sm" type="submit">
          Guardar FAQ
        </Boton>
      </form>

      <div className="space-y-3">
        {faqs.map(faq => (
          <div key={faq.id} className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm flex justify-between items-start">
            <div className="space-y-1">
              <h4 className="font-bold text-sm text-gray-900">{faq.pregunta}</h4>
              <p className="text-xs text-gray-600 leading-relaxed">{faq.respuesta}</p>
            </div>
            <button onClick={() => handleDelete(faq.id)} className="text-gray-400 hover:text-red-600 shrink-0 ml-4">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
