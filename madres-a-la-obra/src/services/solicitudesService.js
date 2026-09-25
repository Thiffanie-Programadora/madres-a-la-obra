import { request } from './api';

export async function obtenerSolicitudes() {
  const data = await request('solicitudes');
  return data || [];
}

export async function crearSolicitud(solicitudData) {
  const nueva = {
    id: `s_${Date.now()}`,
    fecha: new Date().toISOString().split('T')[0],
    estado: 'pendiente',
    ...solicitudData
  };
  return await request('solicitudes', {
    method: 'POST',
    body: JSON.stringify(nueva)
  }) || nueva;
}

export async function actualizarSolicitud(id, solicitudData) {
  return await request(`solicitudes/${id}`, {
    method: 'PUT',
    body: JSON.stringify(solicitudData)
  });
}

export async function eliminarSolicitud(id) {
  return await request(`solicitudes/${id}`, {
    method: 'DELETE'
  });
}
