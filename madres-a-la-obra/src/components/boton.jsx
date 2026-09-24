import React from 'react';

export default function Boton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  className = '', 
  type = 'button',
  disabled = false,
  icon: Icon
}) {
  const baseStyles = "inline-flex items-center justify-center font-bold rounded-2xl transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#E6007E] to-[#7B008A] text-white hover:shadow-lg hover:shadow-pink-500/25 border border-transparent",
    secondary: "bg-[#7B008A] text-white hover:bg-[#670075] border border-transparent",
    outline: "border-2 border-[#E6007E] text-[#E6007E] hover:bg-pink-50",
    outlinePurple: "border-2 border-[#7B008A] text-[#7B008A] hover:bg-purple-50",
    mint: "bg-[#A3E4D7] text-[#7B008A] font-extrabold hover:bg-[#8fd9cb]",
    ghost: "text-gray-700 hover:bg-pink-50 hover:text-[#E6007E]"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
    </button>
  );
}
