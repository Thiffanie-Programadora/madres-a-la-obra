import { request } from './api';

export async function obtenerCategorias() {
  const data = await request('categorias');
  return data || [];
}

export async function crearCategoria(categoriaData) {
  return await request('categorias', {
    method: 'POST',
    body: JSON.stringify(categoriaData)
  });
}

export async function actualizarCategoria(id, categoriaData) {
  return await request(`categorias/${id}`, {
    method: 'PUT',
    body: JSON.stringify(categoriaData)
  });
}

export async function eliminarCategoria(id) {
  return await request(`categorias/${id}`, {
    method: 'DELETE'
  });
}
