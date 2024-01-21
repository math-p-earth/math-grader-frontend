import React from 'react'

import { DiagramImage } from 'core/components/diagrams/DiagramImage'
import { DiagramList } from 'core/components/diagrams/DiagramList'
import { DiagramTable } from 'core/components/diagrams/DiagramTable'
import { DiagramBlock, DiagramImageBlock } from 'core/payload-types'
import { getMediaById } from '~/api/media/getMediaById'

interface ProblemDiagramProps {
	key: string
	diagram: DiagramBlock
}

export function ProblemDiagram({ diagram }: ProblemDiagramProps) {
	switch (diagram.blockType) {
		case 'diagram-image':
			return <DiagramImageWrapper diagram={diagram} />
		case 'diagram-list':
			return <DiagramList diagram={diagram} />
		case 'diagram-table':
			return <DiagramTable diagram={diagram} />
	}
}

interface DiagramImageWrapperProps {
	diagram: DiagramImageBlock
}

async function DiagramImageWrapper({ diagram }: DiagramImageWrapperProps) {
	// will switch to useQueryMedia when we migrate to Vite
	const image = typeof diagram.image === 'string' ? await getMediaById(diagram.image) : diagram.image

	return <DiagramImage image={image} caption={diagram.caption} width={diagram.width} height={diagram.height} />
}
