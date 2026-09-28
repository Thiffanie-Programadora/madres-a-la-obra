/**
 * @jest-environment jsdom
 */
import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';

describe('useAuth Hook Unit Tests', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => <AuthProvider>{children}</AuthProvider>;

  test('Devuelve el estado de autenticación inicial correctamente', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBe(true);
  });

  test('Inicia sesión guardando la información en localStorage', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    const mockUserData = {
      id: 'u99',
      nombre: 'Tifanny Mora',
      email: 'tifanny@madresalaobra.org',
      rol: 'participante',
      tokenSimulado: 'token_mock_123'
    };

    act(() => {
      result.current.login(mockUserData);
    });

    expect(result.current.user.email).toBe('tifanny@madresalaobra.org');
    const stored = JSON.parse(localStorage.getItem('madres_user_session'));
    expect(stored.email).toBe('tifanny@madresalaobra.org');
  });

  test('Limpia la sesión global y borra localStorage al hacer logout', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('madres_user_session')).toBeNull();
  });
});
