/**
 * Tailwind CSS configuration
 * Generated/updated to include the requested theme.extend values.
 */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        // Urban Reverb Dark Palette
        dark: {
          bg: '#0A0A0A',
          surface: '#141414',
          elevated: '#1E1E1E',
          border: '#2A2A2A',
        },
        accent: {
          primary: '#6366F1', // Indigo
          secondary: '#8B5CF6', // Purple
          tertiary: '#EC4899', // Pink
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A3A3A3',
          muted: '#737373',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
    },
  },
  plugins: [],
}
