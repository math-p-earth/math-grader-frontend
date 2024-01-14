// @ts-check

/** @type {import('@trivago/prettier-plugin-sort-imports').PrettierConfig & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  printWidth: 120,
  semi: false,
  proseWrap: 'always',
  useTabs: true,
  endOfLine: 'auto',
  tabWidth: 2,
  arrowParens: 'always',
  bracketSameLine: false,
  bracketSpacing: true,
  singleQuote: true,
  trailingComma: 'all',
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  importOrder: [
    '^dotenv',
    '^react',
    '<THIRD_PARTY_MODULES>',
    '^@/global',
    '^@/(.*)$',
    '^ui/(.*)$',
    '^[./]',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderParserPlugins: ['decorators-legacy', 'jsx', 'typescript'],

  // prettier-plugin-tailwindcss
  tailwindFunctions: ['cva', 'cx', 'clsx', 'cn'],
  tailwindAttributes: [],
};

module.exports = config;
