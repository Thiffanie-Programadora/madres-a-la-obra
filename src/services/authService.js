import { request } from './api';
import { DEFAULT_USERS } from '../data/mockData';

export async function obtenerUsuarios() {
  const data = await request('usuarios');
  let dynamic = [];
  try {
    dynamic = JSON.parse(localStorage.getItem('madres_dynamic_users') || '[]');
  } catch (e) {
    dynamic = [];
  }

  if (data && Array.isArray(data) && data.length > 0) {
    // Unir datos de API con usuarios locales agregados
    const ids = new Set(data.map(u => u.id));
    const extra = dynamic.filter(u => !ids.has(u.id));
    return [...data, ...extra];
  }
  
  const ids = new Set(DEFAULT_USERS.map(u => u.id));
  const extra = dynamic.filter(u => !ids.has(u.id));
  return [...DEFAULT_USERS, ...extra];
}


export async function loginUser(emailOrUser, password) {
  const usuarios = await obtenerUsuarios();
  const input = emailOrUser.trim().toLowerCase();
  
  const user = usuarios.find(u => {
    const userEmail = (u.email || '').toLowerCase();
    const userName = (u.nombre || '').toLowerCase();
    const isPasswordCorrect = u.password === password;

    if (!isPasswordCorrect) return false;

    // Direct email match
    if (userEmail === input) return true;
    // Direct name match
    if (userName === input) return true;
    // Name prefix match (e.g. "thifanie b", "thifanie b mora", "thifanie")
    if (userName.startsWith(input) || input.startsWith('thifanie')) return true;

    return false;
  });

  if (!user) {
    throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
  }

  const tokenSimulado = `token_${Date.now()}_${user.id}`;
  return { ...user, tokenSimulado };
}

export async function registerUser(userData) {
  const usuarios = await obtenerUsuarios();
  const existe = usuarios.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
  if (existe) {
    throw new Error('El correo electrónico ya se encuentra registrado.');
  }
  const nuevoUsuario = {
    id: `u_${Date.now()}`,
    ...userData,
    avatar: userData.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  };
  
  const creado = await request('usuarios', {
    method: 'POST',
    body: JSON.stringify(nuevoUsuario)
  });

  if (!creado) {
    // Si no hay json-server independiente corriendo en el puerto 3001, guardamos en memoria y en localStorage
    DEFAULT_USERS.push(nuevoUsuario);
    try {
      const storedDynamic = JSON.parse(localStorage.getItem('madres_dynamic_users') || '[]');
      storedDynamic.push(nuevoUsuario);
      localStorage.setItem('madres_dynamic_users', JSON.stringify(storedDynamic));
    } catch (e) {
      console.error(e);
    }
  }

  const result = creado || nuevoUsuario;
  const tokenSimulado = `token_${Date.now()}_${result.id}`;
  return { ...result, tokenSimulado };
}


export async function actualizarUsuario(id, userData) {
  return await request(`usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
}

export async function eliminarUsuario(id) {
  try {
    const storedDynamic = JSON.parse(localStorage.getItem('madres_dynamic_users') || '[]');
    const filtered = storedDynamic.filter(u => u.id !== id);
    localStorage.setItem('madres_dynamic_users', JSON.stringify(filtered));
  } catch (e) {
    console.error(e);
  }
  return await request(`usuarios/${id}`, {
    method: 'DELETE'
  });
}
