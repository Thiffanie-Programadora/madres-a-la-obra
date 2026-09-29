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

import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';
import Loading from './components/common/Loading';

import { INITIAL_WORKSHOPS, INITIAL_SWAP_REQUESTS } from './data/mockData';
import { obtenerTalleres } from './services/talleresService';
import { obtenerSkillSwaps } from './services/skillSwapService';

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { accessibility, setAccessibility } = useContext(ThemeContext);

  // Data State conectado directamente a db.json
  const [workshops, setWorkshops] = useState(INITIAL_WORKSHOPS);
  const [swapRequests, setSwapRequests] = useState(INITIAL_SWAP_REQUESTS);
  const [loadingData, setLoadingData] = useState(false);

  // Mantener actualizado si cambia db.json mediante HMR de Vite
  useEffect(() => {
    setWorkshops(INITIAL_WORKSHOPS);
    setSwapRequests(INITIAL_SWAP_REQUESTS);
  }, [INITIAL_WORKSHOPS, INITIAL_SWAP_REQUESTS]);

  // Scroll to top automatically on route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);


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

  const handleWorkshopRegistration = (workshopWithApplicant) => {
    const newSwapRequest = {
      id: Date.now().toString(),
      offeredBy: workshopWithApplicant.solicitanteNombre || "Usuaria Interesada",
      offeredSkill: workshopWithApplicant.solicitanteTrueque || "Solicitud de Cupo Directo",
      requestedSkill: `Inscripción Taller: ${workshopWithApplicant.title}`,
      date: new Date().toISOString().split('T')[0],
      status: "Pendiente",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    };

    setSwapRequests([newSwapRequest, ...swapRequests]);
    setSelectedWorkshopModal(null);
  };

  const handleAddSwap = (newSwap) => {
    setSwapRequests([newSwap, ...swapRequests]);
  };


  const getFontSizeClass = () => {
    if (accessibility?.fontSize === 'large') return 'font-scale-large';
    if (accessibility?.fontSize === 'xlarge') return 'font-scale-xlarge';
    return 'font-scale-normal';
  };

  const getThemeClass = () => {
    let classes = [];
    if (accessibility?.colorblindMode) classes.push('daltonico-mode');
    if (accessibility?.highContrast) classes.push('contrast-125 bg-gray-900 text-white');
    else if (accessibility?.darkMode) classes.push('dark bg-slate-950 text-slate-100');
    else classes.push('bg-[#F8F9FA] text-[#2D3748]');
    return classes.join(' ');
  };

  const getColorblindStyle = () => {
    if (accessibility?.colorblindMode) {
      return {
        filter: 'hue-rotate(180deg) contrast(130%) saturate(140%)',
        WebkitFilter: 'hue-rotate(180deg) contrast(130%) saturate(140%)'
      };
    }
    return {};
  };

  return (
    <div 
      style={getColorblindStyle()}
      className={`min-h-screen flex flex-col font-sans transition-all duration-300 ${getThemeClass()} ${getFontSizeClass()}`}
    >
      
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
          <AppRoutes 
            workshops={workshops}
            setWorkshops={setWorkshops}
            swapRequests={swapRequests}
            setSwapRequests={setSwapRequests}
            setSelectedWorkshopModal={setSelectedWorkshopModal}
            setIsSwapOpen={setIsSwapOpen}
            handleNavClick={handleNavClick}
          />
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
