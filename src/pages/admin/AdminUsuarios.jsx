iimport React, { useState, useEffect } from 'react';
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

  const generateSequentialPassword = (userList) => {
    const year = new Date().getFullYear();
    const count = (userList.length + 1).toString().padStart(3, '0');
    return `EST-${count}-${year}`;
  };

  const handleOpenModal = () => {
    setFormData({
      nombre: '',
      email: '',
      password: generateSequentialPassword(usuarios),
      rol: 'participante',
      habilidadesOfrecidas: ''
    });
    setIsModalOpen(true);
  };


  const [createdTicket, setCreatedTicket] = useState(null);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const nueva = await registerUser(formData);
      setUsuarios(prev => [...prev, nueva]);
      setIsModalOpen(false);
      setCreatedTicket(nueva);
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
            <p className="text-xs text-gray-500">Genera accesos automáticos con contraseñas seguras y únicas asignadas por el sistema.</p>
          </div>
          <Boton variant="primary" size="md" onClick={handleOpenModal} icon={UserPlus}>
            + Registrar Nueva Usuaria (Pass Automática)
          </Boton>
        </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-4">Usuaria</th>
              <th className="p-4">Email / Usuario</th>
              <th className="p-4">Contraseña Asignada</th>
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
                <td className="p-4 text-gray-600 font-medium">{u.email}</td>
                <td className="p-4 font-mono font-bold text-pink-700 bg-pink-50/60 rounded-xl px-2 py-1 inline-block my-2">
                  {u.password || '••••••••'}
                </td>
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
              <h3 className="text-xl font-black text-gray-900">+ Alta de Cuenta con Contraseña Automática</h3>
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
                <label className="block font-bold text-gray-700 mb-1">Correo Electrónico / Usuario</label>
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
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-bold text-gray-700">Contraseña Generada Automáticamente</label>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, password: generateSequentialPassword(usuarios) })}
                    className="text-[11px] text-[#E6007E] font-bold hover:underline"
                  >
                    🔄 Generar Siguiente Código
                  </button>

                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full p-3 pr-10 rounded-2xl bg-pink-50/50 border-2 border-pink-200 font-mono font-bold text-pink-900"
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

      {/* MODAL TICKET DE CREDENCIALES OFICIAL */}
      {createdTicket && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 border-4 border-pink-300 shadow-2xl relative text-center">
            
            {/* Ticket Header Logo */}
            <div className="w-16 h-16 bg-gradient-to-tr from-[#E6007E] to-[#7B008A] rounded-2xl flex items-center justify-center text-white mx-auto shadow-lg">
              <Shield className="w-8 h-8 text-[#A3E4D7]" />
            </div>

            <div className="space-y-1">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
                ✓ Cuenta Creada Exitosamente
              </span>
              <h3 className="text-xl font-black text-gray-900 pt-2">Ticket de Acceso Oficial</h3>
              <p className="text-xs text-gray-500">Entrega estas credenciales personales a la usuaria correspondiente.</p>
            </div>

            {/* Ticket Content Box */}
            <div className="bg-gradient-to-b from-pink-50 to-purple-50 p-5 rounded-2xl border-2 border-dashed border-pink-200 text-left space-y-3 relative font-sans">
              <div className="border-b border-pink-200 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Usuaria Titular</span>
                <p className="text-base font-black text-gray-900">{createdTicket.nombre}</p>
              </div>

              <div className="border-b border-pink-200 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Usuario / Correo Electrónico</span>
                <p className="text-sm font-bold text-[#7B008A]">{createdTicket.email}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Contraseña Asignada</span>
                <p className="text-lg font-mono font-black text-[#E6007E] tracking-wider pt-0.5">
                  {createdTicket.password}
                </p>
              </div>

              <div className="pt-2 border-t border-pink-200 text-[10px] text-gray-500 font-medium flex justify-between items-center">
                <span>Rol: <strong className="text-gray-700 capitalize">{createdTicket.rol}</strong></span>
                <span>Plataforma Madres a la Obra</span>
              </div>
            </div>

            {/* Ticket Actions */}
            <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `*Ticket de Acceso Oficial - Madres a la Obra*\n\n` +
                  `Hola *${createdTicket.nombre}*, aquí tienes tus credenciales para ingresar a la plataforma:\n\n` +
                  `📧 *Usuario/Correo:* ${createdTicket.email}\n` +
                  `🔑 *Contraseña:* ${createdTicket.password}\n` +
                  `👤 *Rol:* ${createdTicket.rol}\n\n` +
                  `¡Bienvenida a Madres a la Obra!`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2.5 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition-all shadow-md"
              >
                💬 Enviar por WhatsApp
              </a>
              <Boton 
                variant="outline" 
                size="md" 
                className="flex-1"
                onClick={() => window.print()}
              >
                🖨️ Imprimir
              </Boton>
              <Boton 
                variant="primary" 
                size="md" 
                className="flex-1"
                onClick={() => setCreatedTicket(null)}
              >
                Cerrar
              </Boton>
            </div>

          </div>
        </div>
      )}

      </div>
    </AdminLayout>
  );
}

