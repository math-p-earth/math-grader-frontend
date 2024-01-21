import React from 'react'
import ReactMarkdown from 'react-markdown'

import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from 'ui/lib/utils'

interface LatexMarkdownProps {
	children: string
	className?: string
	options?: {
		disablePMarginBottom?: boolean
	}
}

export default function LatexMarkdown({ children, className, options }: LatexMarkdownProps) {
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
