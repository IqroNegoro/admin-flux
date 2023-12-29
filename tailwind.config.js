/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./layouts/**/*.vue`,
    `./pages/**/*.vue`,
    `./composables/**/*.{js,ts}`,
    `./plugins/**/*.{js,ts}`,
    `./utils/**/*.{js,ts}`,
    `./App.{js,ts,vue}`,
    `./app.{js,ts,vue}`,
    `./Error.{js,ts,vue}`,
    `./error.{js,ts,vue}`,
    `./app.config.{js,ts}`
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#0F172A",
        "secondary": "#1f3056"
      },
      colors: {
        "primary": "#0F172A",
        "secondary": "#1f3056"
      },
      textColor: {
        "primary": "#0F172A",
        "secondary": "#1f3056"
      }
    },
  },
  plugins: [],
}

