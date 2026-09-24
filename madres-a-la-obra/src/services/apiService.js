const API_URL = 'http://localhost:3001';

// Generic Fetch Wrapper with fallback handling
async function fetchEndpoint(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_URL}/${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });
    if (!res.ok) throw new Error(`HTTP Error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`JSON Server unreachable at ${API_URL}/${endpoint}. Operating in client mode.`);
    return null;
  }
}

// 1. TALLERES API
export async function getTalleresAPI() {
  const data = await fetchEndpoint('talleres');
  return data;
}

export async function createTallerAPI(taller) {
  const data = await fetchEndpoint('talleres', {
    method: 'POST',
    body: JSON.stringify(taller)
  });
  return data;
}

export async function updateTallerAPI(id, taller) {
  const data = await fetchEndpoint(`talleres/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taller)
  });
  return data;
}

export async function deleteTallerAPI(id) {
  const data = await fetchEndpoint(`talleres/${id}`, {
    method: 'DELETE'
  });
  return data;
}

// 2. USUARIOS API
export async function getUsuariosAPI() {
  const data = await fetchEndpoint('usuarios');
  return data;
}

export async function createUsuarioAPI(usuario) {
  const data = await fetchEndpoint('usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario)
  });
  return data;
}

// 3. CATEGORIAS API
export async function getCategoriasAPI() {
  const data = await fetchEndpoint('categorias');
  return data;
}

// 4. SKILLSWAP API
export async function getSkillSwapsAPI() {
  const data = await fetchEndpoint('skillswap');
  return data;
}

export async function createSkillSwapAPI(swap) {
  const data = await fetchEndpoint('skillswap', {
    method: 'POST',
    body: JSON.stringify(swap)
  });
  return data;
}

// 5. SOLICITUDES API
export async function getSolicitudesAPI() {
  const data = await fetchEndpoint('solicitudes');
  return data;
}

export async function createSolicitudAPI(solicitud) {
  const data = await fetchEndpoint('solicitudes', {
    method: 'POST',
    body: JSON.stringify(solicitud)
  });
  return data;
}

// 6. FAQ API
export async function getFaqAPI() {
  const data = await fetchEndpoint('faq');
  return data;
}
