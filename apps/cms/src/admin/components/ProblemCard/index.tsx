import React from 'react'

import { Problem } from 'core/payload-types'

import { ProblemMarkdown } from '../ProblemMarkdown'
import { EditProblemButton } from './EditProblemButton'
import { ProblemNumberIcon } from './ProblemNumberIcon'

export type ProblemCardProblemItem = Pick<Problem, 'content' | 'choices' | 'diagrams'> & Partial<Pick<Problem, 'id'>>

interface ProblemCardProps {
	problem: ProblemCardProblemItem
	number?: number
	refreshData?: () => void
}

export function ProblemCard({ problem, number: order, refreshData }: ProblemCardProps) {
	return (
		<div className="border-t border-t-zinc-300 pt-4">
			<div className="mb-2 flex items-center gap-1">
				{typeof order !== 'undefined' && <ProblemNumberIcon>{order}</ProblemNumberIcon>}
				{problem.id && <EditProblemButton problemId={problem.id} refreshData={refreshData} />}
			</div>
			<ProblemMarkdown diagrams={problem.diagrams}>{problem.content}</ProblemMarkdown>
			{problem.choices && problem.choices.length > 0 && (
				<ol>
					{problem.choices.map(({ choice, id }) => (
						<li key={id}>
							<ProblemMarkdown>{choice}</ProblemMarkdown>
						</li>
					))}
				</ol>
			)}
		</div>
	)
}
