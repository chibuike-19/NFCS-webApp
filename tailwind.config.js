/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        themeBlue: "#0d99ff",
      },
      fontFamily: {
        body: ["Raleway"],
      },
      screens: {
        mobile: "142px",
        tab: "700px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
          "corouselBg": "url('/imgs/hand-image.png')",
          "coverBg": "url('/imgs/cover-bg.png')"
      },
    },
  },
  plugins: [],
};
