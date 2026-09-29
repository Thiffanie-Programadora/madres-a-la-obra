import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [accessibility, setAccessibility] = useState({
    fontSize: 'normal',
    highContrast: false,
    darkMode: false,
    lescoEnabled: true,
    colorblindMode: false,
    voiceReaderEnabled: false
  });

  useEffect(() => {
    if (accessibility.colorblindMode) {
      document.documentElement.classList.add('daltonico-mode');
      document.body.classList.add('daltonico-mode');
    } else {
      document.documentElement.classList.remove('daltonico-mode');
      document.body.classList.remove('daltonico-mode');
    }
  }, [accessibility.colorblindMode]);

  // Generador de Tonos de Audio Nativo por Web Audio API (Respuesta Sonora Inmediata Garantizada)
  const playAudioBeep = (freq = 520, type = 'sine', duration = 0.15) => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      console.warn("AudioContext error:", e);
    }
  };

  const speakText = (text) => {
    // 1. Emitir tono de sonido accesible inmediato
    playAudioBeep(580, 'sine', 0.1);

    // 2. Ejecutar lectura de voz por síntesis
    if (!('speechSynthesis' in window)) return;
    
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
      
      if (!text || text.trim().length === 0) return;

      const cleanText = text.trim();
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.volume = 1.0;
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      const assignVoiceAndSpeak = () => {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          const spanishVoice = voices.find(v => v.lang && (v.lang.startsWith('es') || v.lang.includes('ES') || v.lang.includes('MX') || v.lang.includes('US')));
          if (spanishVoice) utterance.voice = spanishVoice;
        }
        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utterance);
      };

      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        assignVoiceAndSpeak();
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          assignVoiceAndSpeak();
        };
        assignVoiceAndSpeak();
      }
    } catch (err) {
      console.warn("Speech Synthesis error:", err);
    }
  };

  useEffect(() => {
    if (!accessibility.voiceReaderEnabled) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      return;
    }

    let lastText = '';
    const handleMouseOver = (e) => {
      const target = e.target.closest('h1, h2, h3, h4, h5, button, a, p, label, [role="button"]');
      if (target) {
        const text = target.getAttribute('aria-label') || target.innerText || target.textContent;
        if (text && text.trim() !== lastText && text.trim().length > 0) {
          lastText = text.trim();
          speakText(lastText);
        }
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [accessibility.voiceReaderEnabled]);

  const toggleFontSize = () => {
    const sizes = ['normal', 'large', 'xlarge'];
    const nextIdx = (sizes.indexOf(accessibility.fontSize) + 1) % sizes.length;
    setAccessibility(prev => ({ ...prev, fontSize: sizes[nextIdx] }));
  };

  const increaseFontSize = () => {
    if (accessibility.fontSize === 'normal') setAccessibility(prev => ({ ...prev, fontSize: 'large' }));
    else if (accessibility.fontSize === 'large') setAccessibility(prev => ({ ...prev, fontSize: 'xlarge' }));
  };

  const decreaseFontSize = () => {
    if (accessibility.fontSize === 'xlarge') setAccessibility(prev => ({ ...prev, fontSize: 'large' }));
    else if (accessibility.fontSize === 'large') setAccessibility(prev => ({ ...prev, fontSize: 'normal' }));
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

  const toggleColorblind = () => {
    setAccessibility(prev => ({ ...prev, colorblindMode: !prev.colorblindMode }));
  };

  const toggleVoiceReader = () => {
    // Tono de acorde armónico de activación (Do - Mi - Sol)
    playAudioBeep(523.25, 'sine', 0.12);
    setTimeout(() => playAudioBeep(659.25, 'sine', 0.12), 90);
    setTimeout(() => playAudioBeep(783.99, 'sine', 0.18), 180);

    setAccessibility(prev => {
      const nextState = !prev.voiceReaderEnabled;
      if (nextState) {
        speakText("Lector de voz nativo activado. Al pasar el cursor o hacer clic sobre cualquier elemento, la información se leerá en voz alta.");
      } else {
        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      }
      return { ...prev, voiceReaderEnabled: nextState };
    });
  };

  return (
    <ThemeContext.Provider value={{ 
      accessibility, 
      setAccessibility, 
      toggleFontSize, 
      increaseFontSize, 
      decreaseFontSize, 
      toggleContrast, 
      toggleDarkMode, 
      toggleLesco,
      toggleColorblind,
      toggleVoiceReader,
      speakText
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
