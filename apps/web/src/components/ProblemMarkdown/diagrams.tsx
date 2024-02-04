import React from 'react'

import { DiagramList } from 'core/components/diagrams/DiagramList'
import { DiagramTable } from 'core/components/diagrams/DiagramTable'
import { DiagramBlock } from 'core/payload-types'

import { DiagramImageWrapper } from './DiagramImageWrapper'

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
