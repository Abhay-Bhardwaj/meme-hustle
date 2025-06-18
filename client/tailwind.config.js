/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			'neon-pink': '#ff00ff',
  			'neon-blue': '#00ffff',
  			'neon-purple': '#9d00ff',
  			'neon-green': '#00ff00',
  			'neon-red': '#ff0000',
  			'neon-yellow': '#ffff00',
  			'cyber-black': '#0a0a0a',
  			'cyber-gray': '#1a1a1a',
  			'cyber-dark': '#000000',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		animation: {
  			glitch: 'glitch 1s linear infinite',
  			'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
  			'terminal-typing': 'terminal-typing 3s steps(40, end)',
  			'glitch-skew': 'glitch-skew 1s infinite linear alternate-reverse',
  			'neon-gradient': 'neon-gradient 3s ease infinite',
  			'neon-gradient-rainbow': 'neon-gradient-rainbow 4s ease infinite',
  			'matrix-rain': 'matrix-rain 2s linear infinite',
  			'matrix-rain-fall': 'matrix-rain-fall 3s linear infinite',
  			'scan-line': 'scan-line 2s linear infinite',
  			'reveal-text': 'reveal-text 2s ease-in-out forwards',
  			'glitch-overlay': 'glitch-overlay-anim 3s ease-in-out infinite',
  			'grid-move': 'grid-move 10s linear infinite'
  		},
  		keyframes: {
  			glitch: {
  				'0%': {
  					transform: 'translate(0)'
  				},
  				'20%': {
  					transform: 'translate(-2px, 2px)'
  				},
  				'40%': {
  					transform: 'translate(-2px, -2px)'
  				},
  				'60%': {
  					transform: 'translate(2px, 2px)'
  				},
  				'80%': {
  					transform: 'translate(2px, -2px)'
  				},
  				'100%': {
  					transform: 'translate(0)'
  				}
  			},
  			'neon-pulse': {
  				'0%, 100%': {
  					opacity: 1
  				},
  				'50%': {
  					opacity: 0.5
  				}
  			},
  			'terminal-typing': {
  				from: {
  					width: '0'
  				},
  				to: {
  					width: '100%'
  				}
  			},
  			'glitch-skew': {
  				'0%': { transform: 'skew(0deg)' },
  				'20%': { transform: 'skew(1deg)' },
  				'40%': { transform: 'skew(-1deg)' },
  				'60%': { transform: 'skew(0.5deg)' },
  				'80%': { transform: 'skew(-0.5deg)' },
  				'100%': { transform: 'skew(0deg)' }
  			},
  			'neon-gradient': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' }
  			},
  			'neon-gradient-rainbow': {
  				'0%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  				'100%': { backgroundPosition: '0% 50%' }
  			},
  			'matrix-rain': {
  				'0%': { transform: 'translateY(-100%)' },
  				'100%': { transform: 'translateY(100%)' }
  			},
  			'matrix-rain-fall': {
  				'0%': { transform: 'translateY(-100vh)', opacity: 0 },
  				'10%': { opacity: 1 },
  				'90%': { opacity: 1 },
  				'100%': { transform: 'translateY(100vh)', opacity: 0 }
  			},
  			'scan-line': {
  				'0%': { transform: 'translateY(-100%)' },
  				'100%': { transform: 'translateY(100vh)' }
  			},
  			'reveal-text': {
  				'0%': { transform: 'translateX(0)' },
  				'50%': { transform: 'translateX(100%)' },
  				'100%': { transform: 'translateX(100%)' }
  			},
  			'glitch-overlay-anim': {
  				'0%, 100%': { opacity: 0 },
  				'50%': { opacity: 1 }
  			},
  			'grid-move': {
  				'0%': { transform: 'translate(0, 0)' },
  				'100%': { transform: 'translate(20px, 20px)' }
  			}
  		},
  		boxShadow: {
  			neon: '0 0 10px theme(colors.neon-pink), 0 0 20px theme(colors.neon-purple), 0 0 30px rgba(255, 0, 255, 0.3)',
  			'neon-blue': '0 0 10px theme(colors.neon-blue), 0 0 20px theme(colors.neon-blue), 0 0 30px rgba(0, 255, 255, 0.3)',
  			'neon-green': '0 0 10px theme(colors.neon-green), 0 0 20px theme(colors.neon-green), 0 0 30px rgba(0, 255, 0, 0.3)'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}; 