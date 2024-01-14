import { Badge, badgeVariants } from 'ui/components/ui/badge'
import { VariantProps } from 'class-variance-authority'
import { ProblemList } from '~/types/payload-types'

const typeConfigs: Record<ProblemList['type'], TypeBadgeConfig> = {
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

interface TypeBadgeConfig {
	badgeColor: VariantProps<typeof badgeVariants>['badgeColor']
	label: string
}

interface ProblemListTypeBadgeProps {
	type: ProblemList['type']
}

export function ProblemListTypeBadge({ type }: ProblemListTypeBadgeProps) {
	const { badgeColor, label } = typeConfigs[type]
	return <Badge badgeColor={badgeColor}>{label}</Badge>
}
