/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const baseConfig = require('core/tailwind.config')

/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
	...baseConfig,
	content: [...baseConfig.content, './src/admin/**/*.{ts,tsx}'],
	corePlugins: {
		...baseConfig.corePlugins,
		preflight: false,
	},
}
