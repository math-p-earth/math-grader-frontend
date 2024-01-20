'use client'

import React, { useEffect, useState } from 'react'
import { PluggableList } from 'react-markdown/lib/react-markdown'

import { cn } from 'ui/lib/utils'

// using dynamic import because these modules are ESM-only
// TODO: do normal imports when we switch to Vite with ESNext target
const ReactMarkdown = React.lazy(() => import('react-markdown'))

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[]
	? ElementType
	: never

export interface ReactMarkdownPlugins {
	rehypeKatex: ArrayElement<PluggableList>
	remarkFrontmatter: ArrayElement<PluggableList>
	remarkGfm: ArrayElement<PluggableList>
	remarkMath: ArrayElement<PluggableList>
}

interface LatexMarkdownProps {
	children: string
	className?: string
	options?: {
		disablePMarginBottom?: boolean
	}
}

// using dynamic import because these modules are ESM-only
// TODO: do normal imports when we switch to Vite with ESNext target
async function loadPlugins(): Promise<ReactMarkdownPlugins> {
	const [rehypeKatexModule, remarkFrontmatterModule, remarkGfmModule, remarkMathModule] = await Promise.all([
		import('rehype-katex'),
		import('remark-frontmatter'),
		import('remark-gfm'),
		import('remark-math'),
	])
	return {
		rehypeKatex: rehypeKatexModule.default,
		remarkFrontmatter: remarkFrontmatterModule.default,
		remarkGfm: remarkGfmModule.default,
		remarkMath: remarkMathModule.default,
	}
}

export function LatexMarkdown({ children, className, options }: LatexMarkdownProps) {
	const [plugins, setPlugins] = useState<ReactMarkdownPlugins | null>(null)

	useEffect(() => {
		loadPlugins().then((result) => {
			setPlugins(result)
		})
	}, [])

	if (!plugins) {
		// TODO: add loading state?
		return null
	}

	const featureClasses = [...(options?.disablePMarginBottom ? ['[&_p]:pb-0'] : ['[&_p]:pb-4'])]
	return (
		<ReactMarkdown
			className={cn('prose dark:prose-invert dark:text-foreground max-w-none', ...featureClasses, className)}
			rehypePlugins={[plugins.rehypeKatex]}
			remarkPlugins={[plugins.remarkMath, plugins.remarkGfm, plugins.remarkFrontmatter]}
		>
			{children}
		</ReactMarkdown>
	)
}
