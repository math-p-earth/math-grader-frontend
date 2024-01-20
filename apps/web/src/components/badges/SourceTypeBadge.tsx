import { VariantProps } from 'class-variance-authority'
import { Source } from 'core/payload-types'

import { Badge, badgeVariants } from 'ui/components/ui/badge'

const typeConfigs: Record<Source['type'], TypeBadgeConfig> = {
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

interface TypeBadgeConfig {
	badgeColor: VariantProps<typeof badgeVariants>['badgeColor']
	label: string
}

interface SourceTypeBadgeProps {
	type: Source['type']
}

export function SourceTypeBadge({ type }: SourceTypeBadgeProps) {
	const { badgeColor, label } = typeConfigs[type]
	return <Badge badgeColor={badgeColor}>{label}</Badge>
}
