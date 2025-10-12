/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        navy: "#3F3D56",
        red: "#FF6E6C",
        blue: "#27A1A1",
        yellow: "#FF992D",
        white: "#E6E6E6",
      },
      fontSize: {
        sm: "12px",
        md: "16px",
        lg: "20px",
        xl: "28px",
      },
      spacing: {
        sm: "8px",
        md: "16px",
        lg: "24px",
      },
    },
  },
  plugins: [],
};
