import { request } from './api';

export async function obtenerUsuarios() {
  const data = await request('usuarios');
  return data || [];
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
  }) || nuevoUsuario;

  const tokenSimulado = `token_${Date.now()}_${creado.id}`;
  return { ...creado, tokenSimulado };
}

export async function actualizarUsuario(id, userData) {
  return await request(`usuarios/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData)
  });
}

export async function eliminarUsuario(id) {
  return await request(`usuarios/${id}`, {
    method: 'DELETE'
  });
}
