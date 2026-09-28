import React, { createContext, useState } from 'react';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [accessibility, setAccessibility] = useState({
    fontSize: 'normal',
    highContrast: false,
    darkMode: false,
    lescoEnabled: true
  });

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

  return (
    <ThemeContext.Provider value={{ 
      accessibility, 
      setAccessibility, 
      toggleFontSize, 
      increaseFontSize, 
      decreaseFontSize, 
      toggleContrast, 
      toggleDarkMode, 
      toggleLesco 
    }}>
      {children}
    </ThemeContext.Provider>
  );
}
