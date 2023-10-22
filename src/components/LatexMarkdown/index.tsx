import { cn } from '@/lib/utils'
import ReactMarkdown from 'react-markdown'
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
      remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
      rehypePlugins={[rehypeKatex]}
      className={cn('prose max-w-none dark:prose-invert dark:text-foreground', className)}
    >
      {children}
    </ReactMarkdown>
  )
}
