/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        yby: {
          dark: '#1E5E2A',
          primary: '#267332',
          'primary-hover': '#1B5324',
          light: '#DCEAD9',
          tint: '#E6F0E8',
          cream: '#F6F2EA',
          surface: '#F4EFE6',
          zebra: '#F7F4EC',
          heading: '#3D2E28',
          muted: '#7A7067',
          border: '#E6DFD3',
          'border-dark': '#D8D0C5',
          orange: '#E65124',
          blue: '#005885',
          teal: '#2A5C43',
          danger: '#C62828',
        },
      },
      fontFamily: {
        sans: [
          'Plus Jakarta Sans',
          'Inter',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 8px -2px rgba(61, 46, 40, 0.06), 0 1px 4px -1px rgba(61, 46, 40, 0.04)',
        popup: '0 10px 25px -5px rgba(61, 46, 40, 0.1), 0 8px 10px -6px rgba(61, 46, 40, 0.08)',
      },
    },
  },
  plugins: [],
};
