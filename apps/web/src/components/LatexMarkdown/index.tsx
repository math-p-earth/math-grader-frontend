import ReactMarkdown from 'react-markdown'

import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import { cn } from 'ui/lib/utils'

interface LatexMarkdownProps {
	children: string
	className?: string
}

export function LatexMarkdown({ children, className }: LatexMarkdownProps) {
	return (
		<ReactMarkdown
			className={cn('prose max-w-none dark:prose-invert dark:text-foreground', className)}
			rehypePlugins={[rehypeKatex]}
			remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
		>
			{children}
		</ReactMarkdown>
	)
}
