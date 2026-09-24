import React, { useState } from 'react';
import { Heart, Send, Shield, Globe, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Footer({ setCurrentView }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-[#2D3748] to-[#1A202C] text-white pt-16 pb-8 border-t-4 border-[#E6007E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#E6007E] to-[#7B008A] flex items-center justify-center text-white shadow-md">
                <span className="text-xl font-black">M</span>
                <Heart className="w-4 h-4 text-[#A3E4D7] fill-[#A3E4D7] -ml-1 -mt-2" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                Madres a la Obra
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Plataforma digital inclusiva para madres cuidadoras. Fomentamos la economía colaborativa, la capacitación flexible y la sororidad a través del intercambio directo de conocimientos.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="bg-[#E6007E]/20 text-[#E6007E] text-xs font-semibold px-3 py-1 rounded-full border border-[#E6007E]/30 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#A3E4D7]" />
                100% Inclusivo & LESCO
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-[#A3E4D7] flex items-center gap-2">
              <span>Navegación Rápida</span>
            </h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <button onClick={() => setCurrentView('home')} className="hover:text-[#E6007E] transition-colors">
                  • Inicio & Visión
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('talleres')} className="hover:text-[#E6007E] transition-colors">
                  • Directorio de Talleres Generales
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('como-funciona')} className="hover:text-[#E6007E] transition-colors">
                  • ¿Cómo funciona el Trueque?
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('skill-swap')} className="hover:text-[#E6007E] transition-colors">
                  • Comunidad & Red de Trueque
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentView('admin')} className="hover:text-[#A3E4D7] transition-colors font-medium flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-[#A3E4D7]" />
                  • Acceso Administradoras
                </button>
              </li>
            </ul>
          </div>

          {/* Accessibility & Values */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-[#A3E4D7]">Compromiso Inclusivo</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#E6007E] shrink-0 mt-0.5" />
                <span>Adaptaciones LESCO en video y clases presenciales.</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#E6007E] shrink-0 mt-0.5" />
                <span>Horarios compatibles con siestas y escuela.</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-[#E6007E] shrink-0 mt-0.5" />
                <span>Trueque sin dinero para democratizar saberes.</span>
              </li>
              <li className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-[#A3E4D7] shrink-0 mt-0.5" />
                <span>Modalidades Virtuales y Barrios Locales.</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-[#A3E4D7]">Boletín de Talleres</h4>
            <p className="text-xs text-gray-300">
              Recibe semanalmente convocatorias de nuevos talleres con cupos de trueque y becas 100% flexibles.
            </p>
            {subscribed ? (
              <div className="bg-[#2ECC71]/20 border border-[#2ECC71] text-[#2ECC71] p-3 rounded-2xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>¡Gracias por unirte a nuestra red comunitaria!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico..."
                    className="w-full bg-gray-800 text-white placeholder-gray-400 text-xs px-4 py-3 rounded-2xl border border-gray-700 focus:outline-none focus:border-[#E6007E] pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#E6007E] hover:bg-[#7B008A] text-white rounded-xl transition-colors flex items-center justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400 gap-4">
          <p>© 2026 Madres a la Obra SPA - Construyendo autonomía con sororidad.</p>
          <div className="flex space-x-6">
            <a href="#privacidad" onClick={(e) => { e.preventDefault(); alert("Política de privacidad inclusiva y protección de datos comunitarios."); }} className="hover:text-white transition-colors">
              Privacidad & Seguridad
            </a>
            <a href="#terminos" onClick={(e) => { e.preventDefault(); alert("Términos de Convivencia y Trueque Responsable."); }} className="hover:text-white transition-colors">
              Términos de Trueque
            </a>
            <a href="#contacto" onClick={(e) => { e.preventDefault(); alert("Contacto directo con el equipo de coordinación: contacto@madresalaobra.org"); }} className="hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
