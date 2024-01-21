import React from 'react'

import { ProblemCard, ProblemCardProblemItem } from '../ProblemCard'

interface ProblemCardListProps {
	problems: ProblemCardProblemItem[]
	refreshData?: () => void
}

export function ProblemCardList({ problems, refreshData }: ProblemCardListProps) {
	return (
		<div>
			{problems.map((problem, i) => (
				<ProblemCard key={i} problem={problem} number={i + 1} refreshData={refreshData} />
			))}
		</div>
	)
}
