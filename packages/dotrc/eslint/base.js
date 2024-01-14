// @ts-check
const { defineConfig } = require('eslint-define-config')

const config = defineConfig({
	root: true,
	extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'unused-imports'],
	ignorePatterns: ['packages/dotrc', '.eslintrc.js', '.prettierrc.js', 'jest.config.js'],
	rules: {
		'@typescript-eslint/no-unused-vars': 'off', // off to avoid conflict with unused-imports plugin
		'unused-imports/no-unused-imports': 'warn',
		'unused-imports/no-unused-vars': [
			'warn',
			{ vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
		],
	},
	settings: {
		next: {
			rootDir: ['apps/*/'],
		},
	},
})

module.exports = config
