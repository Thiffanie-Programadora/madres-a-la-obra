import { request } from './api';

export async function obtenerFaq() {
  const data = await request('faq');
  return data || [];
}

export async function crearFaq(faqData) {
  const nueva = {
    id: `f_${Date.now()}`,
    ...faqData
  };
  return await request('faq', {
    method: 'POST',
    body: JSON.stringify(nueva)
  }) || nueva;
}

export async function actualizarFaq(id, faqData) {
  return await request(`faq/${id}`, {
    method: 'PUT',
    body: JSON.stringify(faqData)
  });
}

export async function eliminarFaq(id) {
  return await request(`faq/${id}`, {
    method: 'DELETE'
  });
}
