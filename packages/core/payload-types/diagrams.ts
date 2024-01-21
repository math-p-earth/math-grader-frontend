import z from 'zod'

import { CheckForExcess, CheckForMissing } from '../utils/types'
import { DiagramImageBlock, DiagramListBlock, DiagramTableBlock } from './generated'

export type DiagramBlock = DiagramImageBlock | DiagramListBlock | DiagramTableBlock

// add future block types here
const blockTypes = ['diagram-image', 'diagram-list', 'diagram-table'] as const satisfies Readonly<
	DiagramBlock['blockType'][]
>
type BlockType = (typeof blockTypes)[number]

// type check for missing block types. If you get an error here, add the missing block type to the blockTypes array above.
{
	type _CT1 = CheckForMissing<typeof blockTypes, DiagramBlock['blockType']>
	type _CT2 = CheckForExcess<typeof blockTypes, DiagramBlock['blockType']>
}
export const isDiagramBlock = (value: unknown): value is DiagramBlock => {
	if (typeof value !== 'object' || value === null) return false

	if (
		'blockType' in value &&
		typeof value['blockType'] === 'string' &&
		blockTypes.includes(value['blockType'] as BlockType)
	) {
		return true
	}
	return false
}

export const isDiagramBlockArray = (value: unknown): value is DiagramBlock[] => {
	if (!Array.isArray(value)) return false

	for (const item of value) {
		if (!isDiagramBlock(item)) return false
	}
	return true
}

export const diagramListOrderSchemes = [
	{ value: 'unordered:none', label: 'unordered:none' },
	{ value: 'unordered:bullet', label: 'unordered:bullet "•"' },
	{ value: 'ordered:numbers', label: 'ordered:numbers "1."' },
	{ value: 'ordered:latex-numbers', label: 'ordered:latex-numbers "$(1)$"' },
	{ value: 'ordered:letters-lower', label: 'ordered:letters-lower "a."' },
	{ value: 'ordered:letters-upper', label: 'ordered:letters-upper "A."' },
	{ value: 'ordered:latex-letters-lower', label: 'ordered:latex-letters-lower "$(a)$"' },
	{ value: 'ordered:latex-letters-upper', label: 'ordered:latex-letters-upper "$(A)$"' },
] as const
export type DiagramListOrderScheme = (typeof diagramListOrderSchemes)[number]['value']

export const diagramTableDataSchema = z.object({
	rows: z.array(z.array(z.string())),
})
export type DiagramTableData = z.infer<typeof diagramTableDataSchema>
