/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neonGreen: '#39FF14', 
        neonPink: '#FF2079',  
        neonBlue: '#2e31ff',  
        neonYellow: '#F7E600',
        darkBackground: '#1A1A1D', 
        headerBackground: '#16162b', 
        sidebarBackground: '#041705', 
      },
      fontFamily: {
        retro: ['"Press Start 2P"', 'cursive'],
      },
      boxShadow: {
        'neon': '0 0 15px rgba(57, 255, 20, 0.8)',
      },
      animation: {
        neonGlow: 'neonGlow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        neonGlow: {
          '0%': { textShadow: '0 0 5px #39FF14, 0 0 10px #39FF14, 0 0 20px #39FF14, 0 0 40px #39FF14' },
          '100%': { textShadow: '0 0 20px #39FF14, 0 0 30px #39FF14, 0 0 50px #39FF14, 0 0 100px #39FF14' },
        },
      },
      gradientColorStops: {
        'neon-gradient': ['#39FF14', '#FF2079', '#1F51FF'], // Dégradé de couleurs néon
      },
    },
  },
  plugins: [],
}

