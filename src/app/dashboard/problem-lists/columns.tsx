'use client'

import Link from 'next/link'

import { ColumnDef } from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'
import { ProblemList } from '~/api/problem-list/getProblemLists'

type ProblemListRow = ProblemList & { href: string }

export const columns: ColumnDef<ProblemListRow>[] = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name',
    cell: ({ row }) => {
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
  {
    id: 'chevron',
    cell: () => {
      return <ChevronRight strokeWidth={1.5} />
    },
  },
]
