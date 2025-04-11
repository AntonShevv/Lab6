/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",  // Пути ко всем файлам, где используются классы Tailwind
  ],
  theme: {
    extend: {},  // Здесь можно добавить кастомные цвета, шрифты и т.д.
  },
  plugins: [],  // Плагины (например, для форм, анимаций)
  darkMode: 'class',  // Опционально: для ручного переключения тем (через класс 'dark')
}