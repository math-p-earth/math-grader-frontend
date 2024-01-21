import React from 'react'

import { diagramTableDataSchema } from '../../../../../apps/cms/src/collections/Problems/diagram-blocks/Table'
import { DiagramTableBlock } from '../../../payload-types'
import { LatexMarkdown } from '../../LatexMarkdown'

interface DiagramTableProps {
	diagram: DiagramTableBlock
}

export function DiagramTable({ diagram }: DiagramTableProps) {
	const result = diagramTableDataSchema.safeParse(diagram.data)
	if (!result.success) {
		return <div>Parse error: {result.error.message}</div>
	}
	// TODO: do more check before rendering
	const { rows } = result.data

	return (
		<div>
			<table className="border-collapse border border-black">
				<tbody>
					{rows.map((row, idx) => (
						<tr key={idx}>
							{row.map((cell, idx) => (
								<td key={idx} className="border-collapse border border-black px-2 text-center">
									<LatexMarkdown
										options={{
											disablePMarginBottom: true,
										}}
									>
										{cell}
									</LatexMarkdown>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
