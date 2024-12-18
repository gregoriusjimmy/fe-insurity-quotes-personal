import defaultTheme from 'tailwindcss/defaultTheme'
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
    borderRadius:{
        '2lg':'0.625rem'
      },
			fontFamily: {
        primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      spacing:{
        '1.75':'0.4375rem',
        '4.25':'1.0625rem',
        '4.5':'1.125rem',
        '5.5':'1.375rem',
        '6.5':'1.625rem',
      },
			colors: {
        primary: {
          50: 'rgba(var(--primary-50))',
          100: 'rgba(var(--primary-100))',
          200: 'rgba(var(--primary-200))',
          300: 'rgba(var(--primary-300))',
          400: 'rgba(var(--primary-400))',
          500: 'rgba(var(--primary-500))',
          600: 'rgba(var(--primary-600))',
          700: 'rgba(var(--primary-700))',
          800: 'rgba(var(--primary-800))',
          900: 'rgba(var(--primary-900))',
        },
				foreground: {
          50: 'rgba(var(--foreground-50))',
          100: 'rgba(var(--foreground-100))',
          200: 'rgba(var(--foreground-200))',
          300: 'rgba(var(--foreground-300))',
          400: 'rgba(var(--foreground-400))',
          500: 'rgba(var(--foreground-500))',
          600: 'rgba(var(--foreground-600))',
          700: 'rgba(var(--foreground-700))',
          800: 'rgba(var(--foreground-800))',
          900: 'rgba(var(--foreground-900))',
        },
        background: {
          1: 'rgba(var(--background-1))',
          50: 'rgba(var(--background-50))',
          100: 'rgba(var(--background-100))',
          200: 'rgba(var(--background-200))',
          300: 'rgba(var(--background-300))',
          400: 'rgba(var(--background-400))',
          500: 'rgba(var(--background-500))',
          600: 'rgba(var(--background-600))',
          700: 'rgba(var(--background-700))',
          800: 'rgba(var(--background-800))',
          900: 'rgba(var(--background-900))',
        },
        green: {
          500: 'rgba(var(--green-500))',
          600: 'rgba(var(--green-600))',
          700: 'rgba(var(--green-700))',
          900: 'rgba(var(--green-900))',
        },
        red: {
          500: 'rgba(var(--red-500))',
        },
        pink: {
          500: 'rgba(var(--pink-500))',
        },
        blue: {
          500: 'rgba(var(--blue-500))',
          900: 'rgba(var(--blue-900))',
        },
        orange: {
          500: 'rgba(var(--orange-500))',
          600: 'rgba(var(--orange-600))',
        },
        // background: 'rgba(var(--background))',
        black: 'rgba(var(--black))',
        white: 'rgba(var(--white))',
        text: 'rgba(var(--text))',
        hover: 'rgba(var(--hover))',
        hover2: 'rgba(var(--hover2))',
        static: 'rgba(var(--static))',
      },
		},
	},
	plugins: [],
}
