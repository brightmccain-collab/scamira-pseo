/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gold': '#FFD700',
        'gold-dark': '#FFC700',
        'whatsapp': '#25D366',
        'whatsapp-dark': '#128C7E',
      },
    },
  },
  plugins: [],
}
