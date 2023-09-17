import Link from 'next/link'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import { getSourceById } from '~/api/source/getSourceById'
import { SourceTypeBadge } from '~/components/badges/SourceTypeBadge'

import { ProblemCard } from '../../../../components/ProblemCard'

export default async function SourceByIdPage({ params }: { params: { id: string } }) {
  const { id } = params
  const data = await getSourceById(id)
  return (
    <div className="container p-8">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/dashboard/sources">
            Sources
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink as={Link} href={`/dashboard/sources/${id}`}>
            {data.name}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <div className="mt-6 flex items-center gap-3 text-2xl font-semibold">
        {data.name} <SourceTypeBadge type={data.type} />
      </div>
      {data.description && <div className="mt-4">{data.description}</div>}
      <div className="mt-8 flex flex-col gap-4 px-8">
        {data.problems.map(({ id, content, choices }, index) => (
          <ProblemCard key={id} content={content} choices={choices} order={index + 1} />
        ))}
      </div>
    </div>
  )
}
