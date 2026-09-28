import { request } from './api';

export async function obtenerTalleres() {
  const data = await request('talleres');
  return data || [];
}

export async function obtenerTallerPorId(id) {
  const data = await request(`talleres/${id}`);
  return data;
}

export async function crearTaller(tallerData) {
  return await request('talleres', {
    method: 'POST',
    body: JSON.stringify(tallerData)
  });
}

export async function actualizarTaller(id, tallerData) {
  return await request(`talleres/${id}`, {
    method: 'PUT',
    body: JSON.stringify(tallerData)
  });
}

export async function eliminarTaller(id) {
  return await request(`talleres/${id}`, {
    method: 'DELETE'
  });
}
