import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { MathMarkdown } from '~/components/MathMarkdown'

import { ProblemNumberIcon } from './ProblemNumberIcon'

interface ProblemCardProps {
  content: string
  choices: {
    id: string
    choice: string
  }[]
  order: number
}

export function ProblemCard({ content, choices, order }: ProblemCardProps) {
  return (
    <Card>
      <CardHeader>
        <ProblemNumberIcon>{order}</ProblemNumberIcon>
      </CardHeader>
      <CardContent className="prose text-zinc-200 dark:prose-invert">
        <MathMarkdown>{content}</MathMarkdown>
        {choices && choices.length > 0 && (
          <ol className="px-4">
            {choices.map(({ id, choice }) => (
              <li key={id}>
                <MathMarkdown>{choice}</MathMarkdown>
              </li>
            ))}
          </ol>
        )}
      </CardContent>
    </Card>
  )
}