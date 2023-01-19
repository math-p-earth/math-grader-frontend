import ReactMarkdown from 'react-markdown'

import { Typography } from '@mui/material'

import rehypeKatex from 'rehype-katex'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

interface MarkdownProps {
  content: string
  align?: 'left' | 'right' | 'inherit' | 'center' | 'justify'
  variant?:
    | 'inherit'
    | 'body1'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body2'
    | 'caption'
    | 'button'
    | 'overline'
}

export function Markdown({ content, align = 'left', variant = 'body1' }: MarkdownProps) {
  return (
    <Typography variant={variant} align={align} fontFamily="'Sarabun', san-serif">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm, remarkFrontmatter]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
    </Typography>
  )
}
