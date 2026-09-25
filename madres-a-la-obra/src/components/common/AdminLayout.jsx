import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, BookOpen, Users, Tags, RefreshCw, ClipboardList, 
  HelpCircle, Headphones, ArrowLeft, Home
} from 'lucide-react';
import Boton from '../boton';

export default function AdminLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'summary', label: 'Mi Resumen / Dashboard', path: '/admin', icon: LayoutDashboard },
    { id: 'workshops', label: 'Talleres y Cursos', path: '/admin/talleres', icon: BookOpen },
    { id: 'users', label: 'Usuarias y Roles', path: '/admin/usuarios', icon: Users },
    { id: 'categories', label: 'Categorías e Íconos', path: '/admin/categorias', icon: Tags },
    { id: 'swaps', label: 'Intercambio de Habilidades', path: '/admin/skill-swap', icon: RefreshCw },
    { id: 'requests', label: 'Solicitudes e Inscripciones', path: '/admin/talleres', icon: ClipboardList },
    { id: 'faq', label: 'Preguntas Frecuentes (FAQ)', path: '/admin/faq', icon: HelpCircle },
    { id: 'support', label: 'Métricas de Soporte', path: '/admin', icon: Headphones }
  ];

  const currentPath = location.pathname;

  return (
    <div className="min-h-screen bg-gray-100/70 flex flex-col lg:flex-row">
      {/* SIDEBAR LEFT */}
      <aside className="w-full lg:w-72 bg-white border-r border-gray-200 p-6 space-y-6 shrink-0">
        
        {/* User Card */}
        <div className="flex items-center gap-3 bg-pink-50/80 p-3.5 rounded-2xl border border-pink-100">
          <img 
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80" 
            alt="Thifanie B Mora" 
            className="w-11 h-11 rounded-2xl object-cover border-2 border-[#E6007E]"
          />
          <div>
            <h4 className="text-xs font-bold text-gray-900">Thifanie B Mora</h4>
            <span className="text-[10px] font-bold text-[#E6007E] bg-pink-100 px-2 py-0.5 rounded-full inline-block mt-0.5">
              Super Administradora
            </span>
          </div>
        </div>

        {/* Back to Public Site Header Link */}
        <button
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-[#E6007E] to-[#7B008A] hover:opacity-90 text-white font-black text-xs py-3 px-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-pink-500/20"
        >
          <Home className="w-4 h-4 text-[#A3E4D7]" />
          <span>← Volver al Inicio Público</span>
        </button>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const IconComp = item.icon;
            const isActive = currentPath === item.path;

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-[#7B008A] text-white shadow-md shadow-purple-900/20'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-[#E6007E]'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-[#A3E4D7]' : 'text-gray-400'}`} />
                <span className="text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Volver al Inicio */}
        <div className="pt-4 border-t border-gray-100">
          <Boton 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')} 
            className="w-full justify-start text-xs font-bold text-gray-700 hover:text-[#E6007E]"
          >
            ← Salir al Inicio Público
          </Boton>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-8 space-y-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
