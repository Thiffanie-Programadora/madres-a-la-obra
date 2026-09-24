import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('madres_user');
    return saved ? JSON.parse(saved) : {
      id: 'u1',
      nombre: 'Karla Mora',
      email: 'karla@madresalaobra.org',
      rol: 'administradora',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
    };
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('madres_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('madres_user');
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('madres_user');
  };

  const switchRole = (newRol) => {
    setUser(prev => prev ? { ...prev, rol: newRol } : null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, switchRole, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
