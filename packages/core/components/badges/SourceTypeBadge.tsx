import { Badge, BadgeProps } from 'ui/components/ui/badge'

import { SourceType } from '../../payload-types'

interface SourceTypeBadgeConfig {
	badgeColor: BadgeProps['badgeColor']
	label: string
}

const typeConfigs: Record<SourceType, SourceTypeBadgeConfig> = {
	GENERIC: {
		// TODO: change to 'OTHER'
		badgeColor: 'orange',
		label: 'Other',
	},
	BOOK: {
		badgeColor: 'green',
		label: 'Book',
	},
	PAPER: {
		badgeColor: 'sky',
		label: 'Paper',
	},
}

interface SourceTypeBadgeProps {
	type: SourceType
}

export function SourceTypeBadge({ type }: SourceTypeBadgeProps) {
	const { badgeColor, label } = typeConfigs[type]
	return <Badge badgeColor={badgeColor}>{label}</Badge>
}
