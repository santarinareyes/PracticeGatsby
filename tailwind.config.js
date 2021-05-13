module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      zIndex: ["hover"],
      appearance: ["hover", "focus"],
    },
  },
  plugins: [],
}
