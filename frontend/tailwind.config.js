/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./context/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0F9F8',
          100: '#D5EDEC',
          500: '#0F3D3E',
          600: '#0B2F30',
          700: '#082324',
        },
        govGold: '#D4AF37',
        govGreen: '#138808',
        govSaffron: '#FF9933',
        govNavy: '#000080',
      },
    },
  },
  plugins: [],
}
