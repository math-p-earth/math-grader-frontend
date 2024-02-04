import { ProblemListTypeBadge } from 'core/components/badges/ProblemListTypeBadge'
import Link from 'next/link'
import { getProblemListById } from '~/api/problem-list/getProblemListById'
import { SubmissionInput, SubmissionInputTrigger } from '~/app/_create-submission/components/input'

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from 'ui/components/ui/breadcrumb'
import { Button } from 'ui/components/ui/button'

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
				<SubmissionInput problemListId={id} problemListName={data.name}>
					<SubmissionInputTrigger>
						<Button variant="outline">Submit</Button>
					</SubmissionInputTrigger>
				</SubmissionInput>
				<DownloadProblemListButton problemListId={id} />
			</div>
			{data.description && <div className="mt-4">{data.description}</div>}
			<div className="mt-8 flex flex-col gap-4 px-8">
				{data.problems.map((problem, index) => (
					<SubmissionInput key={problem.id} problemListId={id} problemListName={data.name} problemId={problem.id}>
						<ProblemCard
							order={index + 1}
							problem={problem}
							actions={
								<SubmissionInputTrigger>
									<Button variant="outline">Submit</Button>
								</SubmissionInputTrigger>
							}
						/>
					</SubmissionInput>
				))}
			</div>
		</div>
	)
}
