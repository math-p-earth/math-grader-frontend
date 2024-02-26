'use client'

import { useMemo } from 'react'

import { ProblemList } from '~/api/problem-list/getProblemListById'
import { SubmissionInput, SubmissionInputTrigger } from '~/app/_create-submission/components/input'
import { ProblemCard } from '~/components/ProblemCard'
import { SubmissionStatus } from '~/components/ProblemCard/SubmissionStatus'
import { GetMySubmissionsResponse, useMySubmissions } from '~/hooks/useMySubmissions'

import { Button } from 'ui/components/ui/button'

interface SubmissionActionGroupProps {
	submissions: GetMySubmissionsResponse['docs']
	isLoadingSubmissions: boolean
}

export function SubmissionActionGroup({ submissions, isLoadingSubmissions }: SubmissionActionGroupProps) {
	const submitText = submissions.length > 0 ? 'Resubmit' : 'Submit'
	const submissionLink = submissions[0]?.file?.url ?? null
	const status = submissions[0]?.status
	return (
		<div className="flex items-center gap-2">
			{status && <SubmissionStatus status={status} />}
			{submissionLink && (
				<a href={submissionLink} className="text-sm hover:underline" target="_blank">
					<div className="flex items-center gap-1">
						<span>submission.pdf</span>
					</div>
				</a>
			)}
			<SubmissionInputTrigger>
				<Button variant="outline" disabled={isLoadingSubmissions} size="sm">
					{submitText}
				</Button>
			</SubmissionInputTrigger>
		</div>
	)
}
interface ProblemCardsProps {
	problemList: ProblemList
}

export function ProblemCards({ problemList }: ProblemCardsProps) {
	const problemIds = problemList.problems.map((problem) => problem.id)
	const { data: submissions, isLoading: isLoadingSubmissions } = useMySubmissions({
		problemIds,
		depth: 1,
	})
	const submissionsByProblemId = useMemo(
		() =>
			(submissions?.docs ?? []).reduce<Record<string, GetMySubmissionsResponse['docs']>>((acc, submission) => {
				acc[submission.problem.id] = (acc[submission.problem.id] ?? []).concat(submission)
				return acc
			}, {}),
		[submissions],
	)
	return (
		<div className="mt-8 flex flex-col gap-4 px-8">
			{problemList.problems.map((problem, index) => {
				const submissions = (submissionsByProblemId[problem.id] ?? []).sort(
					(a, b) => b.createdAt.localeCompare(a.createdAt), // sort by newest first
				)
				return (
					<SubmissionInput
						key={problem.id}
						problemListId={problemList.id}
						problemListName={problemList.name}
						problemId={problem.id}
					>
						<ProblemCard
							order={index + 1}
							problem={problem}
							actions={<SubmissionActionGroup submissions={submissions} isLoadingSubmissions={isLoadingSubmissions} />}
							submissions={submissions}
						/>
					</SubmissionInput>
				)
			})}
		</div>
	)
}
