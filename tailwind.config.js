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
        "primary": "#6ddf97",
        "secondary": "#A1EEBD"
      },
      colors: {
        "primary": "#6ddf97",
        "secondary": "#A1EEBD"
      },
      textColor: {
        "primary": "#6ddf97",
        "secondary": "#A1EEBD"
      }
    },
  },
  plugins: [],
}

