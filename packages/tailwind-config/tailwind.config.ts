import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.tsx', '../packages/ui/**/*.tsx', './**/*.tsx'],
  theme: {
    extend: {}
  },
  plugins: []
} satisfies Config
