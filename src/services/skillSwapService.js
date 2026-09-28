import { request } from './api';

export async function obtenerSkillSwaps() {
  const data = await request('skillswap');
  return data || [];
}

export async function obtenerSkillSwapPorId(id) {
  return await request(`skillswap/${id}`);
}

export async function crearSkillSwap(swapData) {
  const nuevoSwap = {
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0],
    status: 'Pendiente',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    ...swapData
  };
  return await request('skillswap', {
    method: 'POST',
    body: JSON.stringify(nuevoSwap)
  }) || nuevoSwap;
}

export async function actualizarSkillSwap(id, swapData) {
  return await request(`skillswap/${id}`, {
    method: 'PUT',
    body: JSON.stringify(swapData)
  });
}

export async function eliminarSkillSwap(id) {
  return await request(`skillswap/${id}`, {
    method: 'DELETE'
  });
}
