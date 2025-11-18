/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        nitroBlue: '#0F172A',
        nitroTeal: '#0EA5E9',
        nitroPurple: '#7C3AED',
        nitroGray: '#1E293B'
      },
      boxShadow: {
        card: '0 10px 40px rgba(0, 0, 0, 0.08)'
      }
    }
  },
  plugins: []
};
