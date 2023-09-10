import Link from 'next/link'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { getProblemListById } from '~/api/problem-list/getProblemListById'

import { ProblemCard } from './ProblemCard'

export default async function ProblemListByIdPage({ params }: { params: { id: string } }) {
  const { id } = params
  const data = await getProblemListById(id)
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
      <div className="mt-6 text-2xl font-semibold">{data.name}</div>
      <div className="mt-8 flex flex-col gap-4 px-8">
        {data.problems.map(({ id, content, choices }, index) => (
          <ProblemCard key={id} content={content} choices={choices} order={index + 1} />
        ))}
      </div>
    </div>
  )
}
