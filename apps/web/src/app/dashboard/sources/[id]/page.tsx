import { SourceTypeBadge } from 'core/components/badges/SourceTypeBadge'
import Link from 'next/link'
import { getSourceById } from '~/api/source/getSourceById'
import { SubmissionInput, SubmissionInputTrigger } from '~/app/_create-submission/components/input'
import { ProblemCards } from '~/components/ProblemCards'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'ui/components/ui/breadcrumb'
import { Button } from 'ui/components/ui/button'

export default async function SourceByIdPage({ params }: { params: { id: string } }) {
	const { id } = params
	const data = await getSourceById(id, { depth: 2 })
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
			<div className="mt-6 flex items-center gap-3 pr-8 text-2xl font-semibold">
				<span>{data.name}</span> <SourceTypeBadge type={data.type} />
				<div className="grow" />
				<SubmissionInput headerLabel={data.name}>
					<SubmissionInputTrigger>
						<Button variant="outline">Submit</Button>
					</SubmissionInputTrigger>
				</SubmissionInput>
			</div>
			{data.description && <div className="mt-4">{data.description}</div>}
			<ProblemCards problems={data.problems} submissionHeaderLabel={data.name} />
		</div>
	)
}
