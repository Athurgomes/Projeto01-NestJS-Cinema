/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f0f0f',     // Fundo geral (quase preto)
        surface: '#1a1a1a',     // Fundo de cards e sidebar
        elevated: '#242424',    // Fundo de inputs e modais
        accent: '#e50914',      // Vermelho cinema (destaque)
        'accent-hover': '#b8070f', // Vermelho mais escuro para hover
        'text-main': '#f5f5f5', // Texto principal claro
        'text-muted': '#888888', // Texto secundário/ícones
        border: '#2e2e2e',      // Linhas divisórias sutis
      }
    },
  },
  plugins: [],
}