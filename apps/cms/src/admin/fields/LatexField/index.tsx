import React from 'react'

import { useFormFields } from 'payload/components/forms'

import { DiagramBlock, isDiagramBlockArray } from 'core/payload-types'

import { ProblemMarkdown } from '../../components/ProblemMarkdown'

interface LatexFieldProps {
	targetFieldName: string
	diagramsFieldName?: string
	path?: string
}

const PATH_PREFIX = '__PATH__'

/**
 * Renders the field immediately before this field as LaTeX.
 * @param props UI Props for this component. Automatically set by Payload.
 * @returns JSX.Element
 */
export function LatexField({ targetFieldName, diagramsFieldName, path }: LatexFieldProps) {
	if (targetFieldName.startsWith(PATH_PREFIX) && path) {
		targetFieldName = targetFieldName.replace(PATH_PREFIX, path)
	}
	if (diagramsFieldName && diagramsFieldName.startsWith(PATH_PREFIX) && path) {
		diagramsFieldName = diagramsFieldName.replace(PATH_PREFIX, path)
	}
	const [sourceField, diagramsField] = useFormFields(([fields, _dispatch]) => [
		fields[targetFieldName],
		...(diagramsFieldName ? [fields[diagramsFieldName]] : []),
	])
	if (typeof sourceField?.value === 'undefined') {
		return <ProblemMarkdown>{''}</ProblemMarkdown>
	}
	const source = sourceField?.value as string
	const diagramsValue = diagramsFieldName ? diagramsField?.value : null

	let diagrams: DiagramBlock[] = []
	if (isDiagramBlockArray(diagramsValue)) {
		diagrams = diagramsValue
	}

	return <ProblemMarkdown diagrams={diagrams}>{source}</ProblemMarkdown>
}

interface GenerateLatexFieldOptions {
	targetFieldName: string
	diagramsFieldName?: string
}

export function generateLatexField({ targetFieldName, diagramsFieldName }: GenerateLatexFieldOptions) {
	return (props: LatexFieldProps) => (
		<LatexField {...props} targetFieldName={targetFieldName} diagramsFieldName={diagramsFieldName} />
	)
}
