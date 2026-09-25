import React from 'react';
import { BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import Boton from '../../components/boton';

export default function MisInscripciones() {
  const inscripciones = [
    {
      id: "s1",
      taller: "Confección y Costura Básica para Emprender",
      facilitadora: "Karla Mora",
      horario: "Mar y Jue (10:00 - 11:30 AM)",
      modalidad: "Virtual",
      estado: "Confirmada"
    },
    {
      id: "s2",
      taller: "Marketing Digital con Celular para Mamás",
      facilitadora: "Sofía Bermúdez",
      horario: "Lun y Mié (02:00 - 03:30 PM)",
      modalidad: "Virtual",
      estado: "Pendiente"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="space-y-2">
        <span className="bg-pink-100 text-[#E6007E] text-xs font-black px-3.5 py-1 rounded-full uppercase">
          Mi Historial de Aprendizaje
        </span>
        <h1 className="text-3xl font-black text-gray-900">Mis Inscripciones a Talleres</h1>
        <p className="text-xs text-gray-500">Revisa los cursos en los que te has registrado y sus horarios compatibles.</p>
      </div>

      <div className="space-y-4">
        {inscripciones.map((item) => (
          <div key={item.id} className="bg-white p-6 rounded-3xl border-2 border-pink-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                item.estado === 'Confirmada' ? 'bg-[#A3E4D7] text-[#7B008A]' : 'bg-amber-100 text-amber-800'
              }`}>
                {item.estado}
              </span>
              <h3 className="font-extrabold text-base text-gray-900">{item.taller}</h3>
              <p className="text-xs text-gray-600">Facilitadora: {item.facilitadora}</p>
              <div className="flex items-center gap-2 text-xs text-gray-500 pt-1">
                <Clock className="w-3.5 h-3.5 text-[#E6007E]" />
                <span>{item.horario}</span>
              </div>
            </div>

            <Boton variant="outline" size="sm" onClick={() => alert(`Accediendo al aula virtual de ${item.taller}`)}>
              Acceder al Aula
            </Boton>
          </div>
        ))}
      </div>
    </div>
  );
}
