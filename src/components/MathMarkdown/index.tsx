import ReactMarkdown from 'react-markdown'
import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface MathMarkdownProps {
  children: string
}

export function MathMarkdown({ children }: MathMarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
      rehypePlugins={[rehypeKatex]}
    >
      {children}
    </ReactMarkdown>
  )
}
