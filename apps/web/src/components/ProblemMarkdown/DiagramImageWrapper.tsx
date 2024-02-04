'use client'

import { DiagramImage } from 'core/components/diagrams/DiagramImage'
import { DiagramImageBlock } from 'core/payload-types'
import { useQueryMedia } from '~/hooks/useQueryMedia'

interface DiagramImageWrapperProps {
	diagram: DiagramImageBlock
}

export function DiagramImageWrapper({ diagram }: DiagramImageWrapperProps) {
	const { query } = useQueryMedia({ image: diagram.image })
	// TODO: add skeleton for loading images
	if (!query.data) {
		return null
	}

	return <DiagramImage image={query.data} caption={diagram.caption} width={diagram.width} height={diagram.height} />
}
