'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'
import { ProblemList } from '~/api/problem-list/getProblemLists'
import { ProblemListTypeBadge } from '~/components/badges/ProblemListTypeBadge'

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
    id: 'chevron',
    cell: () => {
      return <ChevronRight strokeWidth={1.5} />
    },
  },
]
