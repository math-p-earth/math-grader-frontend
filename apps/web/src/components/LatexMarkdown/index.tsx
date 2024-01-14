import ReactMarkdown from 'react-markdown'

import { cn } from 'ui/lib/utils'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface LatexMarkdownProps {
	children: string
	className?: string
}

export function LatexMarkdown({ children, className }: LatexMarkdownProps) {
	return (
		<ReactMarkdown
			className={cn('prose dark:prose-invert dark:text-foreground max-w-none', className)}
			rehypePlugins={[rehypeKatex]}
			remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
		>
			{children}
		</ReactMarkdown>
	)
}
