import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, hsl(270, 70%, 55%) 0%, hsl(280, 75%, 60%) 100%)',
        'gradient-primary-soft': 'linear-gradient(135deg, hsl(270, 70%, 95%) 0%, hsl(280, 75%, 92%) 100%)',
        'gradient-hero': 'linear-gradient(180deg, hsl(270, 30%, 98%) 0%, hsl(270, 40%, 96%) 50%, hsl(280, 30%, 95%) 100%)',
        'gradient-surface': 'linear-gradient(135deg, hsl(270, 30%, 98%) 0%, hsl(280, 30%, 95%) 100%)',
        'gradient-glow': 'radial-gradient(ellipse at center, hsl(270, 70%, 85%, 0.3) 0%, transparent 70%)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
        '3xl': 'calc(var(--radius) + 16px)',
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        // Purple theme specific colors
        purple: {
          50: 'hsl(270, 100%, 98%)',
          100: 'hsl(270, 80%, 95%)',
          200: 'hsl(270, 70%, 90%)',
          300: 'hsl(270, 65%, 80%)',
          400: 'hsl(270, 65%, 70%)',
          500: 'hsl(270, 70%, 55%)',
          600: 'hsl(270, 75%, 48%)',
          700: 'hsl(270, 80%, 40%)',
          800: 'hsl(270, 85%, 32%)',
          900: 'hsl(270, 90%, 24%)',
        },
        lavender: {
          50: 'hsl(280, 60%, 98%)',
          100: 'hsl(280, 50%, 95%)',
          200: 'hsl(280, 45%, 90%)',
          300: 'hsl(280, 40%, 82%)',
          400: 'hsl(280, 50%, 70%)',
          500: 'hsl(280, 60%, 60%)',
          600: 'hsl(280, 65%, 50%)',
        },
        chart: {
          '1': 'hsl(270, 70%, 55%)',
          '2': 'hsl(280, 75%, 60%)',
          '3': 'hsl(260, 65%, 65%)',
          '4': 'hsl(290, 60%, 55%)',
          '5': 'hsl(250, 55%, 60%)',
        },
      },
      boxShadow: {
        'sm': 'var(--shadow-sm)',
        'md': 'var(--shadow-md)',
        'lg': 'var(--shadow-lg)',
        'xl': 'var(--shadow-xl)',
        'glow': 'var(--shadow-glow)',
        'glow-lg': '0 0 30px hsl(270, 70%, 55%, 0.2)',
        'inner-glow': 'inset 0 2px 4px 0 hsl(270, 70%, 95%, 0.5)',
        'card': '0 2px 8px -2px hsl(270, 20%, 10%, 0.08), 0 4px 16px -4px hsl(270, 20%, 10%, 0.05)',
        'card-hover': '0 8px 24px -4px hsl(270, 20%, 10%, 0.12), 0 4px 8px -2px hsl(270, 20%, 10%, 0.06)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(20px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.95)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(2deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.4s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.4s ease-out forwards',
        'scale-in': 'scale-in 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
