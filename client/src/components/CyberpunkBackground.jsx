
'use client';

import { useEffect, useState } from 'react';

const CyberpunkBackground = ({ className = '' }) => {
  const [matrixChars, setMatrixChars] = useState([]);

  useEffect(() => {
    // Generate random matrix characters
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const matrixElements = [];
    
    for (let i = 0; i < 50; i++) {
      matrixElements.push({
        id: i,
        char: chars[Math.floor(Math.random() * chars.length)],
        x: Math.random() * 100,
        delay: Math.random() * 10,
        duration: Math.random() * 5 + 3
      });
    }
    
    setMatrixChars(matrixElements);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        {matrixChars.map((item) => (
          <div
            key={item.id}
            className="absolute text-neon-green text-sm font-mono animate-matrix-rain"
            style={{
              left: `${item.x}%`,
              animationDelay: `${item.delay}s`,
              animationDuration: `${item.duration}s`
            }}
          >
            {item.char}
          </div>
        ))}
      </div>
      
      {/* Scan lines */}
      <div className="absolute inset-0 scan-lines"></div>
      
      {/* Glitch overlay */}
      <div className="absolute inset-0 glitch-overlay"></div>
      
      {/* Cyber grid */}
      <div className="absolute inset-0 cyber-grid-pattern"></div>
    </div>
  );
};

export default CyberpunkBackground; 