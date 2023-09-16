'use client'

import Link from 'next/link'

import { ColumnDef } from '@tanstack/react-table'
import { ProblemList } from '~/api/problem-list/getProblemLists'

export const columns: ColumnDef<ProblemList>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => {
      row.original
      const { id, name } = row.original
      return (
        <Link href={`/dashboard/problem-lists/${id}`} className="font-semibold underline">
          {name}
        </Link>
      )
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
    accessorKey: 'type',
  },
  {
    id: 'problems',
    header: 'Problems',
    accessorFn: (row) => row.problems.length,
  },
]
