/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      scrollbar: {
        thin: {
          "scrollbar-thumb": "gray-600",
          "scrollbar-track": "gray-900",
        },
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
