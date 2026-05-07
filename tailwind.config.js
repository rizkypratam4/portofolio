/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: 'var(--bg-base)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        muted: 'var(--bg-muted)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'border-color': 'var(--border)',
        'border-strong': 'var(--border-strong)',
        'accent-subtle': 'var(--accent-subtle)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      textColor: {
        accent: 'var(--accent)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
        muted: 'var(--text-muted)',
      },
      backgroundColor: {
        base: 'var(--bg-base)',
        'surface': 'var(--bg-surface)',
        'elevated': 'var(--bg-elevated)',
        muted: 'var(--bg-muted)',
        'accent-subtle': 'var(--accent-subtle)',
      },
      borderColor: {
        color: 'var(--border)',
        strong: 'var(--border-strong)',
      },
    },
  },
  plugins: [],
}
