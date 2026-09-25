import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomeView from './views/homeView';
import SkillSwapView from './views/skillSwapView';
import HowItWorksView from './views/howItWorksView';
import FaqView from './views/faqView';
import AboutView from './views/aboutView';
import MamaBot from './components/mamabot';
import LoginModal from './components/loginModal';
import SwapModal from './components/swapModal';
import WorkshopDetailModal from './components/workshopDetailModal';

// Architecture Clean Imports
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Loading from './components/common/Loading';
import AccessDenied from './pages/public/AccessDenied';
import NotFound from './pages/public/NotFound';
import Login from './pages/public/Login';
import Perfil from './pages/user/Perfil';
import MisInscripciones from './pages/user/MisInscripciones';
import Mensajes from './pages/user/Mensajes';

import AdminDashboard from './views/adminDashboard';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminFAQ from './pages/admin/AdminFAQ';

import { INITIAL_WORKSHOPS, INITIAL_SWAP_REQUESTS } from './data/mockData';
import { obtenerTalleres } from './services/talleresService';
import { obtenerSkillSwaps } from './services/skillSwapService';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessibility, setAccessibility } = useContext(ThemeContext);

  // Data State
  const [workshops, setWorkshops] = useState(INITIAL_WORKSHOPS);
  const [swapRequests, setSwapRequests] = useState(INITIAL_SWAP_REQUESTS);
  const [loadingData, setLoadingData] = useState(false);

  // Scroll to top automatically on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Load from REST JSON Server API
  useEffect(() => {
    async function loadData() {
      setLoadingData(true);
      const apiTalleres = await obtenerTalleres();
      if (apiTalleres && apiTalleres.length > 0) {
        setWorkshops(apiTalleres);
      }
      const apiSwaps = await obtenerSkillSwaps();
      if (apiSwaps && apiSwaps.length > 0) {
        setSwapRequests(apiSwaps);
      }
      setLoadingData(false);
    }
    loadData();
  }, []);

  // Modal Controls
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [selectedWorkshopModal, setSelectedWorkshopModal] = useState(null);

  const getCurrentNavId = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/talleres')) return 'talleres';
    if (path.startsWith('/como-funciona') || path.startsWith('/nosotros')) return 'como-funciona';
    if (path.startsWith('/skill-swap')) return 'skill-swap';
    if (path.startsWith('/admin')) return 'admin';
    return 'home';
  };

  const handleNavClick = (id) => {
    if (id === 'home') navigate('/');
    else if (id === 'talleres') navigate('/talleres');
    else if (id === 'como-funciona') navigate('/nosotros');
    else if (id === 'skill-swap') navigate('/skill-swap');
    else if (id === 'admin') navigate('/admin');
  };

  const handleWorkshopRegistration = (workshop) => {
    setWorkshops(prev => prev.map(w => {
      if (w.id === workshop.id && w.spotsLeft > 0) {
        return { ...w, spotsLeft: w.spotsLeft - 1 };
      }
      return w;
    }));
    alert(`¡Inscripción exitosa al taller "${workshop.title}"! Confirmación registrada.`);
    setSelectedWorkshopModal(null);
  };

  const handleAddSwap = (newSwap) => {
    setSwapRequests([newSwap, ...swapRequests]);
  };

  const getFontSizeClass = () => {
    if (accessibility.fontSize === 'large') return 'font-scale-large';
    if (accessibility.fontSize === 'xlarge') return 'font-scale-xlarge';
    return 'font-scale-normal';
  };

  const getThemeClass = () => {
    if (accessibility.highContrast) return 'contrast-125 bg-gray-900 text-white';
    if (accessibility.darkMode) return 'dark bg-slate-950 text-slate-100';
    return 'bg-[#F8F9FA] text-[#2D3748]';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${getThemeClass()} ${getFontSizeClass()}`}>
      
      {/* Header / Navbar */}
      <Navbar 
        currentView={getCurrentNavId()}
        setCurrentView={handleNavClick}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
        onOpenPostModal={() => setIsSwapOpen(true)}
        onOpenLoginModal={() => navigate('/login')}
      />

      {/* Main Router */}
      <div className="flex-1">
        {loadingData ? (
          <Loading message="Cargando la plataforma inclusiva..." />
        ) : (
          <Routes>
            {/* Rutas Públicas */}
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
            <Route path="/talleres/:id" element={<HomeView workshops={workshops} swapRequests={swapRequests} onSelectWorkshop={(w) => setSelectedWorkshopModal(w)} onOpenSwapModal={() => setIsSwapOpen(true)} onOpenPostModal={() => setIsSwapOpen(true)} setCurrentView={handleNavClick} />} />

            <Route path="/nosotros" element={<AboutView />} />
            <Route path="/faq" element={<FaqView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/acceso-denegado" element={<AccessDenied />} />

            {/* Rutas Autenticadas (Participante / Facilitadora) */}
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

            {/* Rutas de Administración (Administradora) */}
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

            {/* Ruta 404 NotFound */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </div>

      {/* Footer */}
      <Footer setCurrentView={handleNavClick} />

      {/* Conversational AI Widget */}
      <MamaBot 
        workshops={workshops}
        onSelectWorkshop={(w) => setSelectedWorkshopModal(w)}
      />

      {/* Interactive Modals */}
      <LoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      <SwapModal 
        isOpen={isSwapOpen}
        onClose={() => setIsSwapOpen(false)}
        onAddSwap={handleAddSwap}
      />

      <WorkshopDetailModal 
        workshop={selectedWorkshopModal}
        onClose={() => setSelectedWorkshopModal(null)}
        onRegister={handleWorkshopRegistration}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
