import React from 'react'

import { DiagramImage } from 'core/components/diagrams/DiagramImage'
import { DiagramList } from 'core/components/diagrams/DiagramList'
import { DiagramTable } from 'core/components/diagrams/DiagramTable'
import { DiagramBlock, DiagramImageBlock } from 'core/payload-types'

import { useQueryMedia } from '../../hooks/useQueryMedia'

interface ProblemDiagramProps {
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

function DiagramImageWrapper({ diagram }: DiagramImageWrapperProps) {
	const { query } = useQueryMedia({ media: diagram.image })
	// TODO: add skeleton for loading images
	if (!query.data) {
		return null
	}
	return <DiagramImage image={query.data} caption={diagram.caption} width={diagram.width} height={diagram.height} />
}
