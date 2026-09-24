import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomeView from './views/homeView';
import AdminDashboard from './views/adminDashboard';
import SkillSwapView from './views/skillSwapView';
import HowItWorksView from './views/howItWorksView';
import FaqView from './views/faqView';
import AboutView from './views/aboutView';
import MamaBot from './components/mamabot';
import LoginModal from './components/loginModal';
import SwapModal from './components/swapModal';
import WorkshopDetailModal from './components/workshopDetailModal';
import { AuthProvider, AuthContext } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import { INITIAL_WORKSHOPS, INITIAL_SWAP_REQUESTS } from './data/mockData';
import { getTalleresAPI, getSkillSwapsAPI } from './services/apiService';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  // Accessibility State
  const [accessibility, setAccessibility] = useState({
    fontSize: 'normal',
    highContrast: false,
    lescoEnabled: true
  });

  // Data State
  const [workshops, setWorkshops] = useState(INITIAL_WORKSHOPS);
  const [swapRequests, setSwapRequests] = useState(INITIAL_SWAP_REQUESTS);

  // Scroll to top automatically on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Load from REST JSON Server if active
  useEffect(() => {
    async function loadData() {
      const apiTalleres = await getTalleresAPI();
      if (apiTalleres && apiTalleres.length > 0) {
        setWorkshops(apiTalleres);
      }
      const apiSwaps = await getSkillSwapsAPI();
      if (apiSwaps && apiSwaps.length > 0) {
        setSwapRequests(apiSwaps);
      }
    }
    loadData();
  }, []);

  // Modal Controls
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [selectedWorkshopModal, setSelectedWorkshopModal] = useState(null);

  // Determine current view for Navbar active state
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
    alert(`¡Inscripción exitosa al taller "${workshop.title}"! Te hemos enviado la confirmación.`);
    setSelectedWorkshopModal(null);
  };

  const handleAddSwap = (newSwap) => {
    setSwapRequests([newSwap, ...swapRequests]);
  };

  const getFontSizeClass = () => {
    if (accessibility.fontSize === 'large') return 'text-lg';
    if (accessibility.fontSize === 'xlarge') return 'text-xl';
    return '';
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-all duration-200 ${
      accessibility.highContrast ? 'contrast-125 bg-gray-900 text-white' : 'bg-[#F8F9FA] text-[#2D3748]'
    } ${getFontSizeClass()}`}>
      
      {/* Header / Navbar */}
      <Navbar 
        currentView={getCurrentNavId()}
        setCurrentView={handleNavClick}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
        onOpenPostModal={() => setIsSwapOpen(true)}
        onOpenLoginModal={() => setIsLoginOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-1">
        <Routes>
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

          <Route path="/nosotros" element={<AboutView />} />
          <Route path="/faq" element={<FaqView />} />

          <Route 
            path="/skill-swap" 
            element={
              <SkillSwapView 
                swapRequests={swapRequests}
                onOpenSwapModal={() => setIsSwapOpen(true)}
              />
            } 
          />

          {/* Protected Admin Routes */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute roles={['administradora']}>
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

          {/* Catch-all fallback redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}
