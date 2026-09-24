import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export default function FaqView() {
  const [openIdx, setOpenIdx] = useState(null);

  const faqs = [
    {
      q: "¿Tiene algún costo participar en Madres a la Obra?",
      a: "No. La plataforma es 100% inclusiva y gratuita. Las capacitaciones y la Red Skill-Swap funcionan mediante intercambio mutuo de habilidades sin intermediación monetaria."
    },
    {
      q: "¿Cómo funcionan las adaptaciones para LESCO?",
      a: "Contamos con intérpretes de Lengua de Señas LESCO integrados en vivo en talleres presenciales/virtuales y subtítulos adaptados en Macrotipo."
    },
    {
      q: "¿Cómo se gestiona el tiempo con mis hijos?",
      a: "Todos nuestros talleres están organizados considerando la jornada escolar y las siestas de los bebés (ej. de 10:00 a 11:30 AM), con grabaciones asincrónicas 24/7."
    },
    {
      q: "¿Qué sucede si no tengo un taller que ofrecer para el trueque?",
      a: "¡Todos los saberes tienen valor! Puedes ofrecer apoyo en organización del hogar, cuidado de plantas, tejido, repostería o tomar talleres comunitarios con cupos gratuitos."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <span className="bg-pink-100 text-[#E6007E] text-xs font-black px-4 py-1 rounded-full uppercase">
          Centro de Ayuda
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">Preguntas Frecuentes (FAQ)</h1>
        <p className="text-sm text-gray-600">Resuelve todas tus dudas sobre el trueque, la accesibilidad y la conciliación.</p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-3xl border border-pink-100 shadow-sm overflow-hidden">
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full p-6 text-left font-bold text-gray-900 text-sm sm:text-base flex justify-between items-center gap-4"
            >
              <span>{faq.q}</span>
              <ChevronDown className={`w-5 h-5 text-[#E6007E] transition-transform ${openIdx === idx ? 'rotate-180' : ''}`} />
            </button>
            {openIdx === idx && (
              <div className="px-6 pb-6 text-xs sm:text-sm text-gray-600 border-t border-gray-100 pt-4 leading-relaxed">
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
