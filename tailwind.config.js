/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2A2D9B',
          electric: '#1A1D6B',
          cyan: '#00E5FF',
          purple: '#5832E6',
          yellow: '#FFC700',
          pink: '#F451D7',
          black: '#060A20',
          white: '#F8FAFC',
          card: '#0F1342',
          cardDark: '#0A0D30',
          cardBorder: 'rgba(0, 229, 255, 0.3)',
          tape: '#DCE2FE',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        '3d-heavy': '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 25px rgba(42, 45, 155, 0.4), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
        'cyan-glow': '0 15px 35px -5px rgba(0, 229, 255, 0.4), 0 0 20px rgba(0, 229, 255, 0.3)',
        'purple-glow': '0 15px 35px -5px rgba(88, 50, 230, 0.4), 0 0 20px rgba(88, 50, 230, 0.3)',
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '600',
        extrabold: '700',
        black: '700',
      },
    },
  },
  plugins: [],
};
