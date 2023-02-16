const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{tsx,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				gray: colors.neutral,
			},
			fontFamily: {},
			boxShadow: {
				button: 'inset 0px 0px 1px 1px rgba(255,255,255,0.8), 0 1px 1px 1px rgba(0,0,0,0.08)',
			},
			animation: {
				'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
