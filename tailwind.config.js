/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode:'class',
  theme: {
    extend: {
      colors:{
        'white1':'#FFFFFF',
        'white2':'#F4F4F4',
        'white3':'#E9E9E9',
        'white4':'#757575',
        'purple':'#A445ED',


        'black1':'#050505',
        'black2':'#1F1F1F',
        'black3':'#2D2D2D',
        'black4':'#3A3A3A',


        'error':'#FF5252',

      }
    },
  },
  plugins: [],
}