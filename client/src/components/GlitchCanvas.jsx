'use client';

import { useEffect, useRef } from 'react';

const GlitchCanvas = ({ className = '', type = 'matrix' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let particles = [];
    let glitchLines = [];
    let time = 0;

    const setupMatrix = () => {
      particles = [];
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: Math.random() * 2 + 1,
          size: Math.random() * 10 + 10,
          opacity: Math.random() * 155 + 100,
          char: String.fromCharCode(Math.random() * 93 + 33)
        });
      }
    };

    const drawMatrix = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle) => {
        particle.y += particle.speed;
        
        if (particle.y > canvas.height) {
          particle.y = -20;
          particle.x = Math.random() * canvas.width;
          particle.char = String.fromCharCode(Math.random() * 93 + 33);
        }
        
        // Matrix green color
        const greenIntensity = Math.floor((particle.opacity / 255) * 200 + 55);
        ctx.fillStyle = `rgba(0, ${greenIntensity}, 0, ${particle.opacity / 255})`;
        ctx.font = `${particle.size}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(particle.char, particle.x, particle.y);
      });
    };

    const setupGlitch = () => {
      glitchLines = [];
      for (let i = 0; i < 30; i++) {
        glitchLines.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: Math.random() * 80 + 20,
          height: Math.random() * 3 + 1,
          speed: Math.random() * 1.5 + 0.5,
          color: [Math.random() * 255, Math.random() * 255, Math.random() * 255]
        });
      }
    };

    const drawGlitch = () => {
      // Clear with fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw glitch lines
      glitchLines.forEach((line) => {
        line.y += line.speed;
        
        if (line.y > canvas.height) {
          line.y = -10;
          line.x = Math.random() * canvas.width;
          line.width = Math.random() * 80 + 20;
          line.color = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
        }
        
        ctx.fillStyle = `rgba(${line.color[0]}, ${line.color[1]}, ${line.color[2]}, 0.8)`;
        ctx.fillRect(line.x, line.y, line.width, line.height);
      });
      
      // Add scan lines
      ctx.strokeStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.lineWidth = 1;
      for (let y = 0; y < canvas.height; y += 4) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Random glitch effect
      if (Math.random() < 0.02) {
        const glitchAmount = Math.random() * 40 + 10;
        for (let i = 0; i < glitchAmount; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          ctx.fillStyle = 'rgba(255, 0, 255, 0.8)';
          ctx.fillRect(x, y, 2, 2);
        }
      }
    };

    const animate = () => {
      time += 0.01;
      
      if (type === 'matrix') {
        drawMatrix();
      } else if (type === 'glitch') {
        drawGlitch();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    if (type === 'matrix') {
      setupMatrix();
    } else if (type === 'glitch') {
      setupGlitch();
    }

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [type]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed inset-0 pointer-events-none z-0 ${className}`}
      style={{ opacity: 0.3 }}
    />
  );
};

export default GlitchCanvas; 