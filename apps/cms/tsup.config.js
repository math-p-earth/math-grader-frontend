import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/server.ts', 'src/payload.config.ts'],
	bundle: true,
	splitting: true,
	sourcemap: true,
	clean: true,
	outDir: 'dist',
	format: 'cjs',
	noExternal: ['core', 'ui'],
})
