import Link from 'next/link'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { getProblemListById } from '~/api/problem-list/getProblemListById'

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
    </div>
  )
}
