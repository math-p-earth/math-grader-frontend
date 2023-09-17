'use client'

import { ColumnDef } from '@tanstack/react-table'
import { ChevronRight } from 'lucide-react'
import { Source } from '~/api/source/getSources'
import { SourceTypeBadge } from '~/components/badges/SourceTypeBadge'

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
    id: 'chevron',
    cell: () => {
      return <ChevronRight strokeWidth={1.5} />
    },
  },
]
