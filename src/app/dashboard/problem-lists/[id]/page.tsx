import Link from 'next/link'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { getProblemListById } from '~/api/problem-list/getProblemListById'
import { ProblemListTypeBadge } from '~/components/badges/ProblemListTypeBadge'

import { ProblemCard } from '../../../../components/ProblemCard'
import { DownloadProblemListButton } from './downloadProblemListButton'

export default async function ProblemListByIdPage({ params }: { params: { id: string } }) {
  const { id } = params
  const data = await getProblemListById(id, { depth: 2 })
  return (
    <div className="container p-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/dashboard/problem-lists">
            Problem Lists
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} href={`/dashboard/problem-lists/${id}`}>
            {data.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="mt-6 flex items-center gap-3 pr-8 text-2xl font-semibold">
        <span>{data.name}</span>
        <ProblemListTypeBadge type={data.type} />
        <div className="grow" />
        <DownloadProblemListButton problemListId={id} />
      </div>
      {data.description && <div className="mt-4">{data.description}</div>}
      <div className="mt-8 flex flex-col gap-4 px-8">
        {data.problems.map((problem, index) => (
          <ProblemCard key={problem.id} problem={problem} order={index + 1} />
        ))}
      </div>
    </div>
  )
}
