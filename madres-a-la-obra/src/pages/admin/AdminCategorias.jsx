import React, { useState, useEffect } from 'react';
import { Tags, Plus, Trash2 } from 'lucide-react';
import Boton from '../../components/boton';
import AdminLayout from '../../components/common/AdminLayout';
import { obtenerCategorias, crearCategoria, eliminarCategoria } from '../../services/categoriasService';

export default function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  useEffect(() => {
    obtenerCategorias().then(data => setCategorias(data));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!nombre) return;
    const nueva = await crearCategoria({ id: Date.now().toString(), nombre, descripcion });
    setCategorias([...categorias, nueva || { id: Date.now().toString(), nombre, descripcion }]);
    setNombre('');
    setDescripcion('');
    alert('Categoría creada exitosamente.');
  };

  const handleDelete = async (id) => {
    if (confirm('¿Eliminar esta categoría temática?')) {
      await eliminarCategoria(id);
      setCategorias(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-gray-900">CRUD de Categorías Temáticas</h1>
            <p className="text-xs text-gray-500">Crea, modifica y mantiene las categorías de talleres y habilidades.</p>
          </div>
        </div>

        <form onSubmit={handleCreate} className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-3 text-xs">
          <h3 className="font-bold text-sm text-gray-800">+ Agregar Nueva Categoría</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              required
              placeholder="Nombre de categoría (ej. Arte & Manualidades)"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="p-3 rounded-2xl bg-gray-50 border border-gray-200"
            />
            <input
              type="text"
              placeholder="Descripción breve..."
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="p-3 rounded-2xl bg-gray-50 border border-gray-200"
            />
          </div>
          <Boton variant="primary" size="sm" type="submit">
            Guardar Categoría
          </Boton>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categorias.map(cat => (
            <div key={cat.id} className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-gray-900">{cat.nombre}</h4>
                <p className="text-xs text-gray-500 mt-1">{cat.descripcion}</p>
              </div>
              <button onClick={() => handleDelete(cat.id)} className="text-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
