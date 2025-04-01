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
    screens: {
      xs: "480px",
      'little': "490px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      '2xl': '1536px',
      'smmax': {'max':'639px'},
      'xsmax': {'max':'479px'}
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        '2xl': '1536px',
      },
    },
    fontFamily: {
      serif: ['var(--font-louize)'],
      mono: ['var(--font-fraktion)'],
    },
    fontSize: {
      xs: ['0.75rem', '1.5em'],
      sm: ['0.875rem', '1.5em'],
      md: ['1rem', '1.5em'],
      mdlg: ['1.1rem', '1.5em'],
      lg: ['1.25rem', '1.5em'],
      xl: ['1.5rem', '1.25em'],
      '2xl': ['2rem', '1.25em'],
      '3xl': ['2.25rem', '1.1em'],
      '4xl': ['3rem', '1.1em'],
      '5xl': ['4rem', '0.9em'],
      '6xl': ['5rem', '0.9em'],
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
        hypergold: {
          DEFAULT: "hsl(var(--hypergold))",
        },
        fabric: {
          DEFAULT: "hsl(var(--fabric))",
        },
        sequential: {
          blue: {
            50: "#EFF6FF",
            100: "#D9EAFF",
            200: "#C5DCFF",
            300: "#AECEFF",
            400: "#94BEFF",
            500: "#79ADFC",
            600: "#5394F5",
            700: "#0D429E",
            800: "#00235F",
            900: "#001436",
          },
          purple: {
            50: "#F7EEFF",
            100: "#E9D1FF",
            200: "#D7AEFF",
            300: "#C68DFF",
            400: "#AD68F2",
            500: "#9843ED",
            600: "#7D2BCE",
            700: "#5E0DAE",
            800: "#3C0077",
            900: "#230045",
          },
        },
        categorical: {
          blue: {
            base: "#71A9FF",
            light: "#2864CC",
            dark: "#0A3684",
          },
          turquoise: {
            base: "#1DAFCF",
            light: "#88E7E7",
            dark: "#018092",
          },
          green: {
            base: "#46B974",
            light: "#92E56B",
            dark: "#0F8A40",
          },
          yellow: {
            base: "#E19C35",
            light: "#FBC756",
            dark: "#AE600C",
          },
          red: {
            base: "#DC5858",
            light: "#FF918A",
            dark: "#9E2828",
          },
          fuschia: {
            base: "#B13984",
            light: "#EF86C8",
            dark: "#620A41",
          },
          purple: {
            base: "#9D53E7",
            light: "#CB98FF",
            dark: "#3B0077",
          },
        },
        random: {
          green: "84DE64",
          fairy: "D765FF",
          blue: "65ACFF",
          yellow: "#FBC756",
        }
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
      // bgImage: {
      //   'dot-pattern': "url('/patterns/dot-bg.png')",
      //   'topo-pattern': "url('/patterns/topo-bg.png')",
      // },
    },
  },
  plugins: [require("tailwindcss-animate")],
}