import React, { useState } from 'react';
import { Search, User, PlusCircle, Volume2, Eye, Type, Menu, X, Shield, Sparkles, Sun, Moon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ currentView, setCurrentView, accessibility, setAccessibility, onOpenPostModal, onOpenLoginModal }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const increaseFontSize = () => {
    setAccessibility(prev => ({ ...prev, fontSize: 'large' }));
  };

  const decreaseFontSize = () => {
    setAccessibility(prev => ({ ...prev, fontSize: 'normal' }));
  };

  const toggleContrast = () => {
    setAccessibility(prev => ({ ...prev, highContrast: !prev.highContrast }));
  };

  const toggleDarkMode = () => {
    setAccessibility(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleLesco = () => {
    setAccessibility(prev => ({ ...prev, lescoEnabled: !prev.lescoEnabled }));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-sm transition-all duration-200">
      {/* Top Accessibility Bar */}
      <div className="bg-gradient-to-r from-[#7B008A] to-[#E6007E] text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-[#7B008A] gap-2">
            <span className="font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#A3E4D7]" />
              Plataforma Inclusiva para Madres Cuidadoras
            </span>
            {accessibility.lescoEnabled && (
              <span className="bg-[#A3E4D7] text-[#7B008A] font-bold px-2 py-0.5 rounded-full text-[10px]">
                Intérprete LESCO Activo
              </span>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {/* Font Size A- / A+ Controls (Max 115%) */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded">
              <span className="font-semibold mr-1 flex items-center gap-1">
                <Type className="w-3.5 h-3.5" />
                <span>Letra:</span>
              </span>
              <button
                onClick={decreaseFontSize}
                disabled={accessibility.fontSize === 'normal'}
                title="Disminuir tamaño de letra (100% Normal)"
                className="px-1.5 rounded hover:bg-white/20 disabled:opacity-40 font-bold transition-all"
              >
                A-
              </button>
              <span className="text-[10px] bg-[#A3E4D7] text-[#7B008A] font-extrabold px-1.5 py-0.5 rounded-full">
                {accessibility.fontSize === 'normal' ? '100% Normal' : '115% Máx'}
              </span>
              <button
                onClick={increaseFontSize}
                disabled={accessibility.fontSize === 'large'}
                title="Aumentar tamaño de letra (Máximo 115%)"
                className="px-1.5 rounded hover:bg-white/20 disabled:opacity-40 font-bold transition-all"
              >
                A+
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              title="Cambiar Modo Claro / Oscuro"
              className={`flex items-center gap-1 hover:text-[#A3E4D7] transition-colors font-medium px-2 py-0.5 rounded ${accessibility.darkMode ? 'bg-[#A3E4D7] text-[#7B008A] font-bold' : 'bg-white/10'}`}
            >
              {accessibility.darkMode ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
              <span>{accessibility.darkMode ? 'Modo Claro' : 'Modo Oscuro'}</span>
            </button>

            {/* LESCO Toggle */}
            <button
              onClick={toggleLesco}
              title="Intérprete LESCO (Lengua de Señas)"
              className={`flex items-center gap-1 hover:text-[#A3E4D7] transition-colors font-medium px-2 py-0.5 rounded ${accessibility.lescoEnabled ? 'bg-[#A3E4D7] text-[#7B008A] font-bold' : 'bg-white/10'}`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>LESCO</span>
            </button>

            {user && user.rol === 'administradora' && (
              <button
                onClick={() => setCurrentView('admin')}
                className="ml-2 bg-[#A3E4D7] hover:bg-teal-300 text-[#7B008A] font-extrabold text-xs px-3 py-1 rounded-full flex items-center gap-1 shadow-md transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                Panel de Administración
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Custom Logo Image replacing standard text */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
          >
            <img 
              src="/logo.png" 
              alt="Madres a la Obra" 
              className="h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            />
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'talleres', label: 'Explorar Talleres' },
              { id: 'como-funciona', label: '¿Cómo Funciona?' },
              { id: 'skill-swap', label: 'Comunidad Skill-Swap' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => setCurrentView(link.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  currentView === link.id
                    ? 'text-[#E6007E] bg-pink-50 shadow-inner'
                    : 'text-gray-700 hover:text-[#E6007E] hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-2 bg-pink-50/80 border border-pink-200 p-1.5 pl-3 rounded-2xl">
                <span className="text-xs font-bold text-gray-800">
                  {user.nombre || user.name || user.email}
                </span>
                {user.rol === 'administradora' && (
                  <button
                    onClick={() => setCurrentView('admin')}
                    className="px-3 py-1.5 rounded-xl bg-[#7B008A] text-white text-xs font-bold hover:bg-purple-900 transition-all flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    Panel Admin
                  </button>
                )}
                <button
                  onClick={logout}
                  title="Cerrar Sesión"
                  className="p-1.5 text-gray-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2.5 rounded-2xl border-2 border-[#7B008A] text-[#7B008A] font-bold text-sm hover:bg-purple-50 transition-colors flex items-center gap-1.5"
              >
                <User className="w-4 h-4" />
                <span>Iniciar Sesión</span>
              </button>
            )}

            <button
              onClick={onOpenPostModal}
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#E6007E] to-[#7B008A] text-white font-bold text-sm shadow-md shadow-pink-500/25 hover:shadow-lg hover:shadow-pink-500/35 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4 text-[#A3E4D7]" />
              <span>+ Publicar Taller</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-2xl text-gray-700 hover:bg-pink-50 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#E6007E]" /> : <Menu className="w-6 h-6 text-[#7B008A]" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-pink-100 px-4 pt-2 pb-6 space-y-3 shadow-xl">
          <div className="flex flex-col space-y-1">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'talleres', label: 'Explorar Talleres' },
              { id: 'como-funciona', label: '¿Cómo Funciona?' },
              { id: 'skill-swap', label: 'Comunidad Skill-Swap' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setCurrentView(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-3 rounded-xl text-base font-semibold ${
                  currentView === link.id
                    ? 'text-[#E6007E] bg-pink-50 font-bold'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onOpenLoginModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-2xl border-2 border-[#7B008A] text-[#7B008A] font-bold text-center flex justify-center items-center gap-2"
            >
              <User className="w-5 h-5" />
              <span>Iniciar Sesión</span>
            </button>
            <button
              onClick={() => {
                onOpenPostModal();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#E6007E] to-[#7B008A] text-white font-bold text-center flex justify-center items-center gap-2 shadow-md shadow-pink-500/20"
            >
              <PlusCircle className="w-5 h-5 text-[#A3E4D7]" />
              <span>+ Publicar Taller / Enseñar</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
