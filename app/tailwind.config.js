/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'inner-xl': 'inset 0 4px 4.5px 0 rgb(0 0 0 / 0.25)',
        'drop': '0 4px 4px 0 rgb(0 0 0 / .25)'
      },
      screens: {
        'xs': '420px'
      },
      colors: {
        'background': 'rgb(var(--background))',
        'primary': 'rgb(var(--primary))',
        'text-primary': 'rgb(var(--text-primary))',
        'text-secondary': 'rgb(var(--text-secondary))',
        'onprogress': 'rgb(var(--onprogress))',
        'resolved': 'rgb(var(--resolved))',
        'open': 'rgb(var(--open))',
        'onhold': 'rgb(var(--onhold))',
        'navbar': 'rgb(var(--navbar))',
        'topbar': 'rgb(var(--topbar))',
        'card': 'rgb(var(--card))',
        'placeholder': 'rgb(var(--placeholder))',
        'divider': 'rgb(var(--divider))',
        'searchbar': 'rgb(var(--searchbar))'
      },
    },
  },
  darkMode: 'selector',
  plugins: [],
}

