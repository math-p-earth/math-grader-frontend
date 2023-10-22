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
      className={className}
    >
      {children}
    </ReactMarkdown>
  )
}
