// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('core/tailwind.config')

/** @type {import('tailwindcss').Config} */
module.exports = {
	...baseConfig,
	content: [...baseConfig.content, './src/**/*.{ts,tsx}'],
}
