
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#047857", // green
        secondary: '#34D399', // accent green
        dark: "#1F2937", // dark text color
        light: "#F3F4F6", // light bg color
      },
      fontFamily: {
        sans: ['Inter', "sans-serif"]
      }
    },
  },
  plugins: [],
};