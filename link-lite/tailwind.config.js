/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        retroBlue: '#2e31ff',  
        retroBeige: '#F2E5BF',
        retroOrange: '#FD8B51',
        retroRed: '#CB6040',
        retroRedLight: '#de8266',
        darkBackground: '#1A1A1D', 
        headerBackground: '#16162b', 
        sidebarBackground: '#041705', 
      },
      fontFamily: {
        textRetro: ['"Roboto Slab"', 'cursive'],
        titleAppRetro: ['"Lobster Two"', 'cursive'],
        SidebarRetro: ['"Bebas Neue"', 'cursive'],
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
        'neon-gradient': ['#39FF14', '#FF2079', '#1F51FF'], 
      },
    },
  },
  plugins: [],
}

