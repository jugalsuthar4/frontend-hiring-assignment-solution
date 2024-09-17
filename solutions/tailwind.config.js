/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: "#FF96B5",
        secondary: "#6C63FF",
        booked: "#456c92",
        overlapped: "#F393B3",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
