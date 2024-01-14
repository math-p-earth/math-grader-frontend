'use client'

import {
	ColumnDef,
	Row,
	flexRender,
	getCoreRowModel,
	getPaginationRowModel,
	useReactTable,
} from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from 'ui/components/ui/table'
import { cn } from 'ui/lib/utils'
import { useRouter } from 'next/navigation'

import { DataTablePagination } from './pagination'

interface RowData {
	href?: string
}

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[]
	data: TData[]
}

export function DataTable<TData extends RowData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const router = useRouter()
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
	})

	const handleRowOnClick = (row: Row<TData>) => {
		const href = row.original.href
		if (href) {
			router.push(href)
		}
	}

	return (
		<div>
			<div className="rounded-md border dark:border-zinc-400">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
										</TableHead>
									)
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									key={row.id}
									data-state={row.getIsSelected() && 'selected'}
									className={cn({
										'cursor-pointer': !!row.original.href,
									})}
									onClick={() => handleRowOnClick(row)}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell className="h-24 text-center" colSpan={columns.length}>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<DataTablePagination table={table} />
		</div>
	)
}
