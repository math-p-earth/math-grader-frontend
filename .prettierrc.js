module.exports = {
  singleQuote: true,
  semi: false,
  printWidth: 100,
  tabWidth: 2, // TODO: switch to useTabs: true
  trailingComma: 'es5',
  importOrder: ['^react$', '^next/*', '<THIRD_PARTY_MODULES>', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['decorators-legacy', 'jsx', 'typescript'],
  plugins: ['@trivago/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
}
