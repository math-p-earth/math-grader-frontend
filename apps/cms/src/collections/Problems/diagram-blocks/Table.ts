import { Block, Validate } from 'payload/types'

import { DiagramTableBlock as DiagramTableBlockType, diagramTableDataSchema } from 'core/payload-types'

const validateDataField: Validate<DiagramTableBlockType['data'], unknown, DiagramTableBlockType, unknown> = (
	value,
	{ siblingData: _siblingData },
) => {
	const result = diagramTableDataSchema.safeParse(value)
	if (result.success === false) {
		const errorMsg = result.error.errors.map((error) => `${error.path}: ${error.message}`).join('\n')
		return `Failed to parse data field: ${errorMsg}`
	}
	const { rows } = result.data
	// data table should have the same number of columns on every row
	const columnCount = rows[0].length
	const rowCount = rows.length
	for (let i = 0; i < rowCount; i++) {
		if (rows[i].length !== columnCount) {
			return `Row ${i} has ${rows[i].length} columns, but row 0 has ${columnCount} columns`
		}
	}
	return true
}

export const DiagramTableBlock: Block = {
	slug: 'diagram-table',
	labels: {
		singular: 'Table',
		plural: 'Tables',
	},
	interfaceName: 'DiagramTableBlock',
	fields: [
		{
			name: 'data',
			type: 'json',
			required: true,
			defaultValue: {
				data: [
					['$data$', '$data$'],
					['$data$', '$data$'],
				],
			},
			validate: validateDataField,
		},
	],
}
