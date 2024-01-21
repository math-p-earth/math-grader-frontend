// @ts-check
const { defineConfig } = require('eslint-define-config')

const base = require('./base')

const config = defineConfig({
	...base,
	extends: [...(base.extends ?? []), 'next/core-web-vitals'],
	rules: {
		...base.rules,
		'@next/next/no-html-link-for-pages': 'off',
		'@next/next/no-img-element': 'off',
		'react/no-unescaped-entities': 'off',
	},
})

module.exports = config
