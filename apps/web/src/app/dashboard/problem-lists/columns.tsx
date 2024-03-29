'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ProblemListTypeBadge } from 'core/components/badges/ProblemListTypeBadge'
import { Download } from 'lucide-react'
import { ProblemList } from '~/api/problem-list/getProblemLists'
import { downloadFile } from '~/util/download'

import { Button } from 'ui/components/ui/button'

type ProblemListRow = ProblemList & { href: string }

export const columns: ColumnDef<ProblemListRow>[] = [
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
			return <ProblemListTypeBadge type={type} />
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
								problemListId: id,
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
