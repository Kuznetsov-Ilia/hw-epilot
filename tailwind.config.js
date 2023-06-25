/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        orange: "#FF9900",
        gray: "#c6c6c6",
      },
      borderRadius: {
        DEFAULT: "1vw",
      },
      fontSize: {
        xl: "6vw",
      },
    },
  },
  plugins: [],
};
