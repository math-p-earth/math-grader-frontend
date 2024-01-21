import { Badge, BadgeProps } from 'ui/components/ui/badge'

import { ProblemListType } from '../../payload-types'

interface ProblemListTypeBadgeConfig {
	badgeColor: BadgeProps['badgeColor']
	label: string
}

const typeConfigs: Record<ProblemListType, ProblemListTypeBadgeConfig> = {
	DRILL: {
		badgeColor: 'orange',
		label: 'Drill',
	},
	LECTURE_PROBLEM: {
		badgeColor: 'sky',
		label: 'Lecture Problem',
	},
	CHALLENGE: {
		badgeColor: 'red',
		label: 'Challenge',
	},
	COLLECTION: {
		badgeColor: 'yellow',
		label: 'Collection',
	},
}

interface ProblemListTypeBadgeProps {
	type: ProblemListType
}

export function ProblemListTypeBadge({ type }: ProblemListTypeBadgeProps) {
	const { badgeColor, label } = typeConfigs[type]
	return <Badge badgeColor={badgeColor}>{label}</Badge>
}
