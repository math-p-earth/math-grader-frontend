'use client'

import { ColumnDef } from '@tanstack/react-table'
import { SourceTypeBadge } from 'core/components/badges/SourceTypeBadge'
import { Download } from 'lucide-react'
import { Source } from '~/api/source/getSources'
import { downloadFile } from '~/util/download'

import { Button } from 'ui/components/ui/button'

type SourceRow = Source & { href: string }

export const columns: ColumnDef<SourceRow>[] = [
	{
		id: 'name',
		header: 'Name',
		accessorKey: 'name',
		cell: ({ row }) => {
			const { name } = row.original
			return <div className="font-semibold underline">{name}</div>
		},
	},
	{
		id: 'description',
		header: 'Description',
		accessorKey: 'description',
	},
	{
		id: 'type',
		header: 'Type',
		cell: ({ row }) => {
			const { type } = row.original
			return <SourceTypeBadge type={type} />
		},
	},
	{
		id: 'problems',
		header: 'Problems',
		accessorFn: (row) => row.problems.length,
	},
	{
		id: 'download',
		cell: ({ row }) => {
			const { id } = row.original
			return (
				<Button
					className="-my-2 flex items-center"
					size="icon"
					variant="ghost"
					onClick={(e) => {
						e.stopPropagation()
						downloadFile({
							path: `/problems/download`,
							method: 'POST',
							data: {
								sourceId: id,
							},
						})
					}}
				>
					<Download strokeWidth={1.25} />
				</Button>
			)
		},
	},
]
