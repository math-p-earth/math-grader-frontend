import { ReactNode } from 'react'

import { Problem } from 'core/payload-types'
import { GetMySubmissionsResponse } from '~/hooks/useMySubmissions'

import { Badge } from 'ui/components/ui/badge'
import { Card, CardContent, CardHeader } from 'ui/components/ui/card'

import { ProblemMarkdown } from '../ProblemMarkdown'
import { ChoiceNumberIcon } from './ChoiceNumberIcon'
import { ProblemNumberIcon } from './ProblemNumberIcon'
import { SubmissionStatus } from './SubmissionStatus'

interface ProblemCardProps {
	problem: Problem
	order: number
	actions?: ReactNode
	className?: string
	submissions: GetMySubmissionsResponse['docs']
}

export function ProblemCard({ problem, order, actions, className, submissions = [] }: ProblemCardProps) {
	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex flex-row items-center gap-3">
					<ProblemNumberIcon>{order}</ProblemNumberIcon>
					{typeof problem.source === 'object' && <Badge badgeColor="sky-light">{problem.source.name}</Badge>}
					<span className="flex-1" />
					{actions}
				</div>
			</CardHeader>
			<CardContent className="max-w-none">
				<ProblemMarkdown diagrams={problem.diagrams}>{problem.content}</ProblemMarkdown>
				{problem.choices && problem.choices.length > 0 && (
					<div className="mt-4 flex flex-col gap-4 pl-16">
						{problem.choices.map(({ id, choice, diagrams }, index) => (
							<div key={id} className="flex items-start gap-4">
								<ChoiceNumberIcon>{index + 1}</ChoiceNumberIcon>
								<ProblemMarkdown diagrams={diagrams}>{choice}</ProblemMarkdown>
							</div>
						))}
					</div>
				)}
				{submissions.length > 0 && (
					<div>
						<div className="font-semibold">Submissions</div>
						<ol className="marker:text-md list-inside list-decimal leading-7">
							{submissions.map((submission) => (
								<SubmissionRow key={submission.id} submission={submission} />
							))}
						</ol>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

interface SubmissionRowProps {
	submission: GetMySubmissionsResponse['docs'][number]
}

export function SubmissionRow({ submission }: SubmissionRowProps) {
	return (
		<li>
			<div className="inline-flex min-w-[300px] items-center gap-2 text-sm">
				<a href={submission.file?.url} className="hover:underline" target="_blank">
					<div className="flex items-center gap-1">
						<span>submission.pdf</span>
						{/* <ExternalLink size={14} /> */}
					</div>
				</a>
				<SubmissionStatus status={submission.status} />
				<div className="flex-grow" />
				<div>{new Date(submission.createdAt).toLocaleString('th-TH', { hour12: false })}</div>
			</div>
		</li>
	)
}
