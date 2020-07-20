const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./components/**/*.js", "./pages/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "notify-blue": "#395DF9",
      },
    },
  },
  variants: {},
  plugins: [],
};
