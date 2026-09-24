import React, { useState } from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import HomeView from './views/homeView';
import AdminDashboard from './views/adminDashboard';
import SkillSwapView from './views/skillSwapView';
import HowItWorksView from './views/howItWorksView';
import MamaBot from './components/mamabot';
import { LoginModal, SwapModal, WorkshopDetailModal } from './components/modals';

import { INITIAL_WORKSHOPS, INITIAL_SWAP_REQUESTS } from './data/mockData';

export default function App() {
  // Navigation View State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'talleres' | 'como-funciona' | 'skill-swap' | 'admin'

  // Accessibility State
  const [accessibility, setAccessibility] = useState({
    fontSize: 'normal', // 'normal' | 'large' | 'xlarge'
    highContrast: false,
    lescoEnabled: true
  });

  // Data State
  const [workshops, setWorkshops] = useState(INITIAL_WORKSHOPS);
  const [swapRequests, setSwapRequests] = useState(INITIAL_SWAP_REQUESTS);

  // Modal Controls
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSwapOpen, setIsSwapOpen] = useState(false);
  const [selectedWorkshopModal, setSelectedWorkshopModal] = useState(null);

  // Registration handler for Workshop Detail Modal
  const handleWorkshopRegistration = (workshop) => {
    setWorkshops(prev => prev.map(w => {
      if (w.id === workshop.id && w.spotsLeft > 0) {
        return { ...w, spotsLeft: w.spotsLeft - 1 };
      }
      return w;
    }));
    alert(`¡Inscripción exitosa al taller "${workshop.title}"! Te hemos enviado el link de confirmación.`);
    setSelectedWorkshopModal(null);
  };

  const handleAddSwap = (newSwap) => {
    setSwapRequests([newSwap, ...swapRequests]);
  };

  // Font class dynamic helper
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
        currentView={currentView}
        setCurrentView={setCurrentView}
        accessibility={accessibility}
        setAccessibility={setAccessibility}
        onOpenPostModal={() => setIsSwapOpen(true)}
        onOpenLoginModal={() => setIsLoginOpen(true)}
      />

      {/* Main View Router */}
      <div className="flex-1">
        {currentView === 'home' && (
          <HomeView 
            workshops={workshops}
            swapRequests={swapRequests}
            onSelectWorkshop={(w) => setSelectedWorkshopModal(w)}
            onOpenSwapModal={() => setIsSwapOpen(true)}
            onOpenPostModal={() => setIsSwapOpen(true)}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'talleres' && (
          <HomeView 
            workshops={workshops}
            swapRequests={swapRequests}
            onSelectWorkshop={(w) => setSelectedWorkshopModal(w)}
            onOpenSwapModal={() => setIsSwapOpen(true)}
            onOpenPostModal={() => setIsSwapOpen(true)}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'como-funciona' && (
          <HowItWorksView 
            onOpenSwapModal={() => setIsSwapOpen(true)}
            setCurrentView={setCurrentView}
          />
        )}

        {currentView === 'skill-swap' && (
          <SkillSwapView 
            swapRequests={swapRequests}
            onOpenSwapModal={() => setIsSwapOpen(true)}
          />
        )}

        {currentView === 'admin' && (
          <AdminDashboard 
            workshops={workshops}
            setWorkshops={setWorkshops}
            swapRequests={swapRequests}
            setSwapRequests={setSwapRequests}
            setCurrentView={setCurrentView}
          />
        )}
      </div>

      {/* Footer */}
      <Footer setCurrentView={setCurrentView} />

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
