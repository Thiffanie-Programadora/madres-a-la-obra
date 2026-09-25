import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('madres_user_session');
      return stored ? JSON.parse(stored) : {
        id: 'u1',
        nombre: 'Thifanie B Mora',
        email: 'thifanie@madresalaobra.com',
        rol: 'administradora',
        tokenSimulado: 'token_admin_demo',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      };
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('madres_user_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('madres_user_session');
    }
  }, [user]);

  const login = (userData) => {
    const session = {
      ...userData,
      tokenSimulado: userData.tokenSimulado || `token_${Date.now()}`
    };
    setUser(session);
    return session;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('madres_user_session');
  };

  const switchRole = (newRol) => {
    if (user) {
      const updated = { ...user, rol: newRol };
      setUser(updated);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, switchRole, isAuthenticated: !!user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
