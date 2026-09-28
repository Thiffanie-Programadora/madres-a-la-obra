import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Dynamic / Modular Page Imports
import HomeView from '../views/homeView';
import SkillSwapView from '../views/skillSwapView';
import AboutView from '../views/aboutView';
import FaqView from '../views/faqView';

import Login from '../pages/public/Login';
import Registro from '../pages/public/Registro';
import AccessDenied from '../pages/public/AccessDenied';
import NotFound from '../pages/public/NotFound';

import Perfil from '../pages/user/Perfil';
import MisInscripciones from '../pages/user/MisInscripciones';
import Mensajes from '../pages/user/Mensajes';

import AdminDashboard from '../views/adminDashboard';
import AdminUsuarios from '../pages/admin/AdminUsuarios';
import AdminCategorias from '../pages/admin/AdminCategorias';
import AdminFAQ from '../pages/admin/AdminFAQ';

export default function AppRoutes({
  workshops,
  setWorkshops,
  swapRequests,
  setSwapRequests,
  setSelectedWorkshopModal,
  setIsSwapOpen,
  handleNavClick
}) {
  return (
    <Routes>
      {/* Dynamic Public Routes */}
      <Route 
        path="/" 
        element={
          <HomeView 
            workshops={workshops}
            swapRequests={swapRequests}
            onSelectWorkshop={(w) => setSelectedWorkshopModal(w)}
            onOpenSwapModal={() => setIsSwapOpen(true)}
            onOpenPostModal={() => setIsSwapOpen(true)}
            setCurrentView={handleNavClick}
          />
        } 
      />

      <Route 
        path="/talleres" 
        element={
          <HomeView 
            workshops={workshops}
            swapRequests={swapRequests}
            onSelectWorkshop={(w) => setSelectedWorkshopModal(w)}
            onOpenSwapModal={() => setIsSwapOpen(true)}
            onOpenPostModal={() => setIsSwapOpen(true)}
            setCurrentView={handleNavClick}
          />
        } 
      />
      <Route 
        path="/talleres/:id" 
        element={
          <HomeView 
            workshops={workshops} 
            swapRequests={swapRequests} 
            onSelectWorkshop={(w) => setSelectedWorkshopModal(w)} 
            onOpenSwapModal={() => setIsSwapOpen(true)} 
            onOpenPostModal={() => setIsSwapOpen(true)} 
            setCurrentView={handleNavClick} 
          />
        } 
      />

      <Route path="/nosotros" element={<AboutView />} />
      <Route path="/faq" element={<FaqView />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/acceso-denegado" element={<AccessDenied />} />

      {/* Authenticated Routes (User Roles) */}
      <Route 
        path="/perfil" 
        element={
          <ProtectedRoute allowedRoles={['participante', 'facilitadora', 'administradora']}>
            <Perfil />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/mis-inscripciones" 
        element={
          <ProtectedRoute allowedRoles={['participante', 'facilitadora', 'administradora']}>
            <MisInscripciones />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/skill-swap" 
        element={
          <SkillSwapView 
            swapRequests={swapRequests}
            onOpenSwapModal={() => setIsSwapOpen(true)}
          />
        } 
      />
      <Route 
        path="/skill-swap/:id" 
        element={
          <SkillSwapView 
            swapRequests={swapRequests}
            onOpenSwapModal={() => setIsSwapOpen(true)}
          />
        } 
      />
      <Route 
        path="/mensajes" 
        element={
          <ProtectedRoute allowedRoles={['participante', 'facilitadora', 'administradora']}>
            <Mensajes />
          </ProtectedRoute>
        } 
      />

      {/* Admin Module Routes */}
      <Route 
        path="/admin" 
        element={
          <ProtectedRoute allowedRoles={['administradora']}>
            <AdminDashboard 
              workshops={workshops}
              setWorkshops={setWorkshops}
              swapRequests={swapRequests}
              setSwapRequests={setSwapRequests}
              setCurrentView={handleNavClick}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/usuarios" 
        element={
          <ProtectedRoute allowedRoles={['administradora']}>
            <AdminUsuarios />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/talleres" 
        element={
          <ProtectedRoute allowedRoles={['administradora']}>
            <AdminDashboard 
              workshops={workshops}
              setWorkshops={setWorkshops}
              swapRequests={swapRequests}
              setSwapRequests={setSwapRequests}
              setCurrentView={handleNavClick}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/categorias" 
        element={
          <ProtectedRoute allowedRoles={['administradora']}>
            <AdminCategorias />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/skill-swap" 
        element={
          <ProtectedRoute allowedRoles={['administradora']}>
            <AdminDashboard 
              workshops={workshops}
              setWorkshops={setWorkshops}
              swapRequests={swapRequests}
              setSwapRequests={setSwapRequests}
              setCurrentView={handleNavClick}
            />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/faq" 
        element={
          <ProtectedRoute allowedRoles={['administradora']}>
            <AdminFAQ />
          </ProtectedRoute>
        } 
      />

      {/* Fallback 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
