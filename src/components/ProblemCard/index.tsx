import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Problem } from '~/types/payload-types'

import { ProblemMarkdown } from '../ProblemMarkdown'
import { ChoiceNumberIcon } from './ChoiceNumberIcon'
import { ProblemNumberIcon } from './ProblemNumberIcon'

interface ProblemCardProps {
  problem: Problem
  order: number
}

export function ProblemCard({ problem, order }: ProblemCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center gap-4">
          <ProblemNumberIcon>{order}</ProblemNumberIcon>
          {typeof problem.source === 'object' && (
            <Badge badgeColor="sky-light">{problem.source.name}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="max-w-none">
        <ProblemMarkdown className="pb-4" diagrams={problem.diagrams}>
          {problem.content}
        </ProblemMarkdown>
        {problem.choices && problem.choices.length > 0 && (
          <div className="flex flex-col gap-4 pl-16">
            {problem.choices.map(({ id, choice, diagrams }, index) => (
              <div key={id} className="flex items-start gap-4">
                <ChoiceNumberIcon>{index + 1}</ChoiceNumberIcon>
                <ProblemMarkdown diagrams={diagrams}>{choice}</ProblemMarkdown>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
