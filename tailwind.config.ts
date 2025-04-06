import type { Config } from "tailwindcss";

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
      },
      boxShadow: {
        'green-glow': '0 4px 14px rgba(34, 197, 94, 0.4)',
      },
    },
  },
  plugins: [],
} satisfies Config;
