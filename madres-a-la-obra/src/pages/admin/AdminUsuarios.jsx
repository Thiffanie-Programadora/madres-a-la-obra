import React, { useState, useEffect } from 'react';
import { Users, Shield, Trash2, Edit, Plus } from 'lucide-react';
import Boton from '../../components/boton';
import { obtenerUsuarios, eliminarUsuario } from '../../services/authService';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    obtenerUsuarios().then(data => {
      setUsuarios(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    if (confirm('¿Deseas suspender/eliminar esta usuaria del sistema?')) {
      await eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900">CRUD de Usuarios & Roles</h1>
          <p className="text-xs text-gray-500">Asigna roles, edita datos de perfil y suspende cuentas del sistema.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Usuaria</th>
              <th className="p-4">Email</th>
              <th className="p-4">Rol</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {usuarios.map(u => (
              <tr key={u.id} className="hover:bg-pink-50/20">
                <td className="p-4 flex items-center gap-3 font-bold text-gray-900">
                  <img src={u.avatar} alt={u.nombre} className="w-8 h-8 rounded-full object-cover border" />
                  {u.nombre}
                </td>
                <td className="p-4 text-gray-600">{u.email}</td>
                <td className="p-4">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                    u.rol === 'administradora' ? 'bg-amber-100 text-amber-800' :
                    u.rol === 'facilitadora' ? 'bg-purple-100 text-[#7B008A]' : 'bg-pink-100 text-[#E6007E]'
                  }`}>
                    {u.rol}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(u.id)} className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
