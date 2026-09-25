import React, { useState, useEffect } from 'react';
import { Users, Shield, Trash2, Plus, Eye, EyeOff, UserPlus } from 'lucide-react';
import Boton from '../../components/boton';
import AdminLayout from '../../components/common/AdminLayout';
import { obtenerUsuarios, registerUser, eliminarUsuario } from '../../services/authService';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    rol: 'participante',
    habilidadesOfrecidas: ''
  });

  const [error, setError] = useState(null);

  useEffect(() => {
    loadUsuarios();
  }, []);

  const loadUsuarios = async () => {
    setLoading(true);
    const data = await obtenerUsuarios();
    setUsuarios(data);
    setLoading(false);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const nueva = await registerUser(formData);
      alert(`¡Usuaria ${nueva.nombre} creada exitosamente!`);
      setIsModalOpen(false);
      setFormData({ nombre: '', email: '', password: '', rol: 'participante', habilidadesOfrecidas: '' });
      loadUsuarios();
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta.');
    }
  };

  const handleDelete = async (id) => {
    if (confirm('¿Deseas suspender/eliminar esta usuaria del sistema?')) {
      await eliminarUsuario(id);
      setUsuarios(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Gestión de Usuarios & Registro Exclusivo Admin</h1>
            <p className="text-xs text-gray-500">Solo la Administradora (Thifanie B Mora) puede crear y gestionar cuentas de usuarias.</p>
          </div>
          <Boton variant="primary" size="md" onClick={() => setIsModalOpen(true)} icon={UserPlus}>
            + Registrar Nueva Usuaria
          </Boton>
        </div>

      {/* Users Table */}
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

      {/* MODAL REGISTRAR NUEVA USUARIA (EXCLUSIVO ADMIN) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 border-2 border-pink-200 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-pink-100 pb-3">
              <h3 className="text-xl font-black text-gray-900">+ Registrar Nueva Usuaria</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold">
                ✕
              </button>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-3 rounded-xl border border-red-200 font-bold">
                {error}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nombre Completo</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  placeholder="ej. Lucía Fernández"
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="lucia@madresalaobra.com"
                  className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Contraseña</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full p-3 pr-10 rounded-2xl bg-gray-50 border border-gray-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Rol de la Cuenta</label>
                  <select
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium"
                  >
                    <option value="participante">Participante</option>
                    <option value="facilitadora">Facilitadora</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Habilidades Iniciales</label>
                  <input
                    type="text"
                    value={formData.habilidadesOfrecidas}
                    onChange={(e) => setFormData({ ...formData, habilidadesOfrecidas: e.target.value })}
                    placeholder="ej. Costura, Repostería"
                    className="w-full p-3 rounded-2xl bg-gray-50 border border-gray-200"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <Boton variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Boton>
                <Boton variant="primary" size="sm" type="submit">
                  Guardar y Crear Cuenta
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
