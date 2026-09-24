import React, { useState } from 'react';
import { 
  Bot, X, Send, Sparkles, Clock, Volume2, ArrowRight, MessageSquare, 
  ThumbsUp, CheckCircle, RefreshCw, Zap
} from 'lucide-react';

export default function MamaBot({ workshops, onSelectWorkshop }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola, mamita! 🎀 Soy MamáBot / SkillAI. Puedo ayudarte a conciliar tus tiempos con la siesta de tus peques, buscar talleres adaptados con LESCO o proponerte trueques compatibles.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    { label: '👶 Siesta Escolar (10am - 12pm)', text: 'Busco talleres en horario de 10:00 a 12:00 para la siesta o jornada escolar.' },
    { label: '🤟 Talleres LESCO', text: 'Muéstrame talleres que incluyan intérprete LESCO o adaptaciones accesibles.' },
    { label: '🤝 ¿Cómo funciona el Trueque?', text: 'Explícame cómo puedo intercambiar mis habilidades sin gastar dinero.' },
    { label: '🍰 Talleres de Repostería o Costura', text: 'Quiero ver talleres de manualidades, confección o repostería fácil.' }
  ];

  const handleSendMessage = (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      let botResponse = '';
      const lower = text.toLowerCase();

      if (lower.includes('siesta') || lower.includes('10') || lower.includes('horario') || lower.includes('escuela')) {
        botResponse = '¡Entendido! Te recomiendo el taller "Confección y Costura Básica para Emprender" o "Marketing Digital con Celular". Ambos se imparten de 10:00 a 11:30 AM en modalidad 100% flexible y grabada.';
      } else if (lower.includes('lesco') || lower.includes('señas') || lower.includes('sorda') || lower.includes('accesible')) {
        botResponse = '¡Excelente! Contamos con intérprete LESCO activo en el taller "Finanzas del Hogar y Presupuesto" y en "Postres y Repostería Creativa". Además, todos nuestros videos traen subtítulos en Macrotipo.';
      } else if (lower.includes('trueque') || lower.includes('funciona') || lower.includes('dinero') || lower.includes('skill')) {
        botResponse = 'El Skill-Swap es 100% gratuito. Publicas lo que sabes (ej. cuidado de plantas, contabilidad básica, repostería) y te conectas con otra mamá. ¡Intercambias horas de aprendizaje sin usar dinero!';
      } else {
        botResponse = `¡Qué maravillosa consulta! He revisado nuestras opciones en "Madres a la Obra" y encontré 3 alternativas ideales adaptadas a tu rutina diaria. ¿Te gustaría agendar una prueba o consultar a una facilitadora?`;
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: botResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group bg-gradient-to-r from-[#E6007E] to-[#7B008A] text-white p-4 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center border-2 border-white"
        >
          <div className="absolute -top-2 -right-1 bg-[#A3E4D7] text-[#7B008A] text-[10px] font-black px-2 py-0.5 rounded-full shadow border border-white animate-bounce">
            SkillAI 🤖
          </div>
          <Bot className="w-7 h-7 text-[#A3E4D7]" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white rounded-3xl shadow-2xl border-2 border-pink-200 w-[90vw] sm:w-[380px] h-[520px] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#7B008A] via-[#E6007E] to-[#7B008A] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/20 flex items-center justify-center border border-white/30">
                <Bot className="w-5 h-5 text-[#A3E4D7]" />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1.5">
                  MamáBot / SkillAI
                  <span className="w-2 h-2 rounded-full bg-[#A3E4D7] animate-ping" />
                </h3>
                <p className="text-[11px] text-pink-100">Asistente Inteligente de Conciliación</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="bg-pink-50/70 p-2 border-b border-pink-100 overflow-x-auto flex gap-1.5 scrollbar-none">
            {quickPrompts.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(item.text)}
                className="shrink-0 text-[11px] bg-white border border-pink-200 text-[#7B008A] px-2.5 py-1 rounded-xl font-medium hover:bg-[#E6007E] hover:text-white hover:border-[#E6007E] transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/50">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#E6007E] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-pink-100 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span
                    className={`block text-[10px] mt-1 text-right ${
                      msg.sender === 'user' ? 'text-pink-200' : 'text-gray-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-pink-100 p-3 rounded-2xl rounded-bl-none text-xs text-gray-500 flex items-center gap-2">
                  <Bot className="w-4 h-4 text-[#E6007E] animate-spin" />
                  <span>MamáBot está redactando la recomendación...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-white border-t border-pink-100 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregúntale a MamáBot o concilia un horario..."
              className="flex-1 text-xs sm:text-sm bg-gray-100 px-3.5 py-2.5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#E6007E] text-gray-700"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-gradient-to-r from-[#E6007E] to-[#7B008A] text-white rounded-2xl disabled:opacity-50 hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
}
