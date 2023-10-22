import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { LatexMarkdown } from '~/components/MathMarkdown'

import { ChoiceNumberIcon } from './ChoiceNumberIcon'
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
      <CardContent className="prose max-w-none dark:prose-invert dark:text-foreground">
        <LatexMarkdown>{content}</LatexMarkdown>
        {choices && choices.length > 0 && (
          <div className="flex flex-col gap-0 pl-16">
            {choices.map(({ id, choice }, index) => (
              <div key={id} className="flex items-start gap-4">
                <ChoiceNumberIcon>{index + 1}</ChoiceNumberIcon>
                <LatexMarkdown className="-mt-5">{choice}</LatexMarkdown>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
