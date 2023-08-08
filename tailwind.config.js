/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        base: ["Outfit", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
};
