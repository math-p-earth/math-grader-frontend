import { ReactNode } from 'react'

import { Problem } from 'core/payload-types'

import { Badge } from 'ui/components/ui/badge'
import { Card, CardContent, CardHeader } from 'ui/components/ui/card'

import { ProblemMarkdown } from '../ProblemMarkdown'
import { ChoiceNumberIcon } from './ChoiceNumberIcon'
import { ProblemNumberIcon } from './ProblemNumberIcon'

interface ProblemCardProps {
	problem: Problem
	order: number
	actions?: ReactNode
	className?: string
}

export function ProblemCard({ problem, order, actions, className }: ProblemCardProps) {
	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex flex-row items-center gap-4">
					<ProblemNumberIcon>{order}</ProblemNumberIcon>
					{typeof problem.source === 'object' && <Badge badgeColor="sky-light">{problem.source.name}</Badge>}
					<span className="flex-1" />
					{actions}
				</div>
			</CardHeader>
			<CardContent className="max-w-none">
				<ProblemMarkdown diagrams={problem.diagrams}>{problem.content}</ProblemMarkdown>
				{problem.choices && problem.choices.length > 0 && (
					<div className="mt-4 flex flex-col gap-4 pl-16">
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
