const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{tsx,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			fontFamily: {
				sans: ['InterVariable', ...defaultTheme.fontFamily.sans],
			},
			boxShadow: {
				button: 'inset 0px 0px 1px 1px rgba(255,255,255,0.8), 0 1px 1px 1px rgba(0,0,0,0.08)',
			},
		},
	},
	plugins: [require('@tailwindcss/forms')],
}
