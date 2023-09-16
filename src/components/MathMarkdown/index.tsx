import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface MathMarkdownProps {
  children: string
  className?: string
}

export function MathMarkdown({ children, className }: MathMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
      rehypePlugins={[rehypeKatex]}
      className={className}
    >
      {children}
    </ReactMarkdown>
  )
}
