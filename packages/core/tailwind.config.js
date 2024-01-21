// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('ui/tailwind.config')

module.exports = {
	...baseConfig,
	content: [...baseConfig.content, './**/*.{ts,tsx}'],
}
