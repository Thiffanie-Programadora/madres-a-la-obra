/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { AuthContext } from '../context/AuthContext';

describe('ProtectedRoute Component Unit Tests', () => {
  test('Redirige a /login si no hay usuario autenticado', () => {
    const authValue = { user: null, isAuthenticated: false };

    render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['administradora']}>
                  <div>Panel Privado</div>
                </ProtectedRoute>
              } 
            />
            <Route path="/login" element={<div>Vista Login</div>} />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Vista Login')).toBeInTheDocument();
  });

  test('Permite el renderizado si el usuario tiene el rol permitido', () => {
    const authValue = {
      user: { id: 'u1', nombre: 'Karla', rol: 'administradora' },
      isAuthenticated: true
    };

    render(
      <AuthContext.Provider value={authValue}>
        <MemoryRouter initialEntries={['/admin']}>
          <Routes>
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['administradora']}>
                  <div>Panel Privado Administradora</div>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(screen.getByText('Panel Privado Administradora')).toBeInTheDocument();
  });
});
