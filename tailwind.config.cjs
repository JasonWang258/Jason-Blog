/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
		container: {
			center: true,
			padding: '2rem',
			screens: {
				lg: '768px',
				xl: '1080px',
				'2xl': '1080px',
			},
		},
	},
	plugins: [
		function({addBase, theme}) {
			addBase({
				'h1': { fontSize: theme('fontSize.3xl') },
				'h2': { fontSize: theme('fontSize.2xl') },
				'h3': { fontSize: theme('fontSize.xl') },
				'h4': { fontSize: theme('fontSize.lg') },
			})
		}
	],
	darkMode: 'class',
}
