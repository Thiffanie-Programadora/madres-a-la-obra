import React from 'react';

export default function AnimatedText({ text, className = "" }) {
  if (!text) return null;

  const words = text.split(' ');

  return (
    <span className={`inline-wrap ${className}`}>
      {words.map((word, index) => (
        <span
          key={index}
          className="interactive-word-span inline-block transition-all duration-300 mr-1.5"
        >
          {word}
        </span>
      ))}
    </span>
  );
}
