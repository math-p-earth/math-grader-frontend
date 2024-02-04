'use client'

import { useMemo } from 'react'

import { Submission, Upload } from 'core/payload-types'
import { ExternalLink } from 'lucide-react'
import { ProblemList } from '~/api/problem-list/getProblemListById'
import { SubmissionInput, SubmissionInputTrigger } from '~/app/_create-submission/components/input'
import { ProblemCard } from '~/components/ProblemCard'
import { useMySubmissions } from '~/hooks/useMySubmissions'

import { Button } from 'ui/components/ui/button'

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
			(submissions?.docs ?? []).reduce<Record<string, Submission>>((acc, submission) => {
				acc[submission.problem.id] = submission
				return acc
			}, {}),
		[submissions],
	)
	return (
		<div className="mt-8 flex flex-col gap-4 px-8">
			{problemList.problems.map((problem, index) => {
				const submission = submissionsByProblemId[problem.id]
				const submissionFile = submission?.file as Upload | undefined
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
							actions={
								submissionFile ? (
									<a href={submissionFile.url} className="text-sm hover:underline" target="_blank">
										<div className="flex items-center gap-1">
											<span>submission.pdf</span>
											<ExternalLink size={14} />
										</div>
									</a>
								) : (
									<SubmissionInputTrigger>
										<Button variant="outline" disabled={isLoadingSubmissions}>
											Submit
										</Button>
									</SubmissionInputTrigger>
								)
							}
						/>
					</SubmissionInput>
				)
			})}
		</div>
	)
}
