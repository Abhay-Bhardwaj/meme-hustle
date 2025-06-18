'use client';

import { useState, useEffect } from 'react';

const TerminalText = ({ 
  text, 
  speed = 50, 
  className = '', 
  showCursor = true,
  onComplete = null,
  glitchEffect = true 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      if (onComplete) onComplete();
    }
  }, [currentIndex, text, speed, onComplete]);

  useEffect(() => {
    if (glitchEffect && isComplete) {
      const glitchInterval = setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance of glitch
          setGlitchActive(true);
          setTimeout(() => setGlitchActive(false), 200);
        }
      }, 2000);

      return () => clearInterval(glitchInterval);
    }
  }, [isComplete, glitchEffect]);

  const glitchText = () => {
    if (!glitchActive) return displayText;
    
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    return displayText.split('').map((char, index) => {
      if (Math.random() < 0.3) {
        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
      }
      return char;
    }).join('');
  };

  return (
    <div className={`terminal-text-container ${className}`}>
      <span 
        className={`terminal-text ${glitchActive ? 'glitch' : ''}`}
        data-text={glitchText()}
      >
        {glitchText()}
      </span>
      {showCursor && (
        <span 
          className={`terminal-cursor ${isComplete ? 'blink' : ''}`}
          style={{ 
            borderRight: '2px solid var(--neon-green)',
            animation: isComplete ? 'blink-caret 0.75s step-end infinite' : 'none'
          }}
        >
          &nbsp;
        </span>
      )}
    </div>
  );
};

export default TerminalText; 