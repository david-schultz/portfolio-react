/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
    },
    fontFamily: {
      sans: ['var(--font-graphik)'],
    },
    fontSize: {
      xs: ['0.75rem', '1.5em'],
      sm: ['0.875rem', '1.5em'],
      md: ['1rem', '1.5em'],
      lg: ['1.25rem', '1.25em'],
      xl: ['1.5rem', '1.15em'],
      '2xl': ['2rem', '1.1em'],
      '3xl': ['2.25rem', '1.1em'],
      '4xl': ['3rem', '1.1em'],
      '5xl': ['4rem', '0.9em'],
      '6xl': ['6rem', '0.9em'],
      '7xl': ['7rem', '0.9em'],
      '8xl': ['8rem', '0.9em'],
    },
    fontWeight: {
      '400': '400',
      '500': '500',
      '600': '600',
    },
    extend: {
      colors: {
        invert: "#FFFFFF",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        background: {
          DEFAULT: "hsl(var(--background))",
          invert: "hsl(var(--background-invert))",
        },
        foreground: {
          DEFAULT: "hsl(var(--foreground))",
          invert: "hsl(var(--foreground-invert))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}