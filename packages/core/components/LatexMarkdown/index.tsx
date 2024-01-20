import React from 'react'

import { cn } from 'ui/lib/utils'

// using dynamic import because these modules are ESM-only
// TODO: do normal imports when we switch to Vite with ESNext target
const ReactMarkdown = React.lazy(() => import('react-markdown'))

let rehypeKatex: (typeof import('rehype-katex'))['default']
let remarkFrontmatter: (typeof import('remark-frontmatter'))['default']
let remarkGfm: (typeof import('remark-gfm'))['default']
let remarkMath: (typeof import('remark-math'))['default']
;(async () => {
	if (typeof window !== 'undefined') {
		rehypeKatex = (await import('rehype-katex')).default
		remarkFrontmatter = (await import('remark-frontmatter')).default
		remarkGfm = (await import('remark-gfm')).default
		remarkMath = (await import('remark-math')).default
	}
})()

interface LatexMarkdownProps {
	children: string
	className?: string
	options?: {
		disablePMarginBottom?: boolean
	}
}

export function LatexMarkdown({ children, className, options }: LatexMarkdownProps) {
	const featureClasses = [...(options?.disablePMarginBottom ? ['[&_p]:pb-0'] : ['[&_p]:pb-4'])]
	return (
		<ReactMarkdown
			className={cn('prose dark:prose-invert dark:text-foreground max-w-none', ...featureClasses, className)}
			rehypePlugins={[rehypeKatex]}
			remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
		>
			{children}
		</ReactMarkdown>
	)
}
