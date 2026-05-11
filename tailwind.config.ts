import type { Config } from 'tailwindcss'

const config = {
  theme: {
    extend: {
      colors: {
        canvas: '#fffdf8',
        ink: '#0f172a',
        sky: '#dbeafe',
        peach: '#ffedd5',
        berry: '#7c3aed',
        lagoon: '#0f766e',
        sunrise: '#f59e0b',
      },
      fontFamily: {
        sans: [
          '"Geist Variable"',
          '"Segoe UI"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: ['"Space Grotesk"', '"Geist Variable"', 'sans-serif'],
      },
      borderRadius: {
        playful: '1.5rem',
        card: '1.75rem',
      },
      boxShadow: {
        float: '0 24px 60px rgba(15, 23, 42, 0.18)',
      },
      backgroundImage: {
        aurora:
          'radial-gradient(circle at top, rgba(251, 191, 36, 0.28) 0, rgba(251, 191, 36, 0.08) 18%, transparent 42%), linear-gradient(180deg, #fffdf8 0%, #eef4ff 100%)',
      },
    },
  },
} satisfies Config

export default config
