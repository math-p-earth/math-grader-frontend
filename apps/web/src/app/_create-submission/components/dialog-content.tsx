import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Loader2, Upload, X } from 'lucide-react'
import { ProblemNumberIcon } from '~/components/ProblemCard/ProblemNumberIcon'

import { Button } from 'ui/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from 'ui/components/ui/dialog'
import { ScrollArea } from 'ui/components/ui/scroll-area'
import { cn } from 'ui/lib/utils'

import { SubmissionProblem } from '../api'
import { DraftSubmission, PendingUpload, useCreateSubmissionStore } from '../store'

type Item =
	| {
			type: 'pendingUpload'
			pendingUpload: PendingUpload
			createdAt: Date
	  }
	| {
			type: 'submissionProblem'
			submissionProblem: SubmissionProblem
			createdAt: Date
	  }

export default function CreateSubmissionDialogContent({
	draft,
	onCancel,
}: {
	draft: DraftSubmission
	onCancel: () => void
}) {
	const { addUpload, showSuccess, isSubmitting, submit } = useCreateSubmissionStore()
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			for (const file of acceptedFiles) {
				addUpload({ file })
			}
		},
		[addUpload],
	)
	const { getRootProps, getInputProps, isDragAccept } = useDropzone({ onDrop, disabled: isSubmitting })

	const items = useMemo(() => {
		const submissionProblems = Object.values(draft.problems)
			.map(
				(problem): Item => ({
					type: 'submissionProblem',
					submissionProblem: problem,
					createdAt: new Date(problem.createdAt),
				}),
			)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
		const pendingUploads = Object.values(draft.pendingUploads)
			.map(
				(pendingUpload): Item => ({
					type: 'pendingUpload',
					pendingUpload: pendingUpload,
					createdAt: new Date(pendingUpload.createdAt),
				}),
			)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
		return [...submissionProblems, ...pendingUploads]
	}, [draft.problems, draft.pendingUploads])
	return (
		<div className="flex flex-col gap-4">
			<DialogHeader>
				<DialogTitle>Submit answers</DialogTitle>
				{draft.headerLabel && <DialogDescription>{draft.headerLabel}</DialogDescription>}
			</DialogHeader>
			<ScrollArea className="-mr-4 max-h-[calc(100vh_-_280px)]">
				<div className="flex flex-col gap-2 pr-4">
					{items.map((item, idx) => {
						switch (item.type) {
							case 'submissionProblem':
								return (
									<SubmissionProblemView
										key={item.submissionProblem.problemId}
										submissionProblem={item.submissionProblem}
										order={idx + 1}
									/>
								)
							case 'pendingUpload':
								return <PendingUploadView key={item.pendingUpload.id} pendingUpload={item.pendingUpload} />
							default:
								return item satisfies never
						}
					})}
				</div>
			</ScrollArea>
			<DialogFooter className="flex-row-reverse">
				{showSuccess ? (
					<Button onClick={onCancel} disabled={isSubmitting}>
						Close
					</Button>
				) : (
					<>
						<Button variant="outline" className="relative" {...getRootProps()} disabled={isSubmitting}>
							<input {...getInputProps()} />
							<Upload size={16} className="mr-2" />
							Add More
							<div
								className={cn(
									'pointer-events-none absolute inset-0 rounded-md bg-green-500 opacity-0 transition-opacity',
									isDragAccept && 'opacity-10',
								)}
							/>
						</Button>
						<span className="sm:flex-1" />
						<Button variant="outline" onClick={onCancel} disabled={isSubmitting}>
							Cancel
						</Button>
						<Button type="submit" onClick={submit} disabled={isSubmitting || Object.keys(draft.problems).length === 0}>
							<div className="flex items-center gap-1">
								<span>Submit</span>
								{isSubmitting && <Loader2 className="animate-spin" size={16} />}
							</div>
						</Button>
					</>
				)}
			</DialogFooter>
		</div>
	)
}

function PendingUploadView({ pendingUpload }: { pendingUpload: PendingUpload }) {
	const { id, file, errorMessage } = pendingUpload
	const { removeUpload } = useCreateSubmissionStore()
	const blobUrl = useBlobUrl(pendingUpload.file)
	return (
		<div
			className={cn(
				'rounded-md border border-zinc-200 p-4 dark:border-zinc-800',
				errorMessage
					? 'border-red-300 bg-red-100 text-red-900 dark:border-red-800 dark:bg-red-950 dark:text-red-200'
					: '',
			)}
		>
			<div className="flex items-center gap-2">
				<a href={blobUrl} className="hover:underline" target="_blank">
					{file.name}
				</a>
				{errorMessage ? null : <Loader2 className="animate-spin" size={14} />}
				<span className="flex-1" />
				<Button variant="ghost" size="sm" className="h-6 p-1" onClick={() => removeUpload(id)}>
					<X size={16} />
				</Button>
			</div>
			{errorMessage && <div className="text-sm">{errorMessage}</div>}
		</div>
	)
}

function SubmissionProblemView({ submissionProblem, order }: { submissionProblem: SubmissionProblem; order: number }) {
	const { removeFile, showSuccess } = useCreateSubmissionStore()
	return (
		<div
			className={cn(
				'flex gap-2 rounded-md border border-zinc-200 p-4 dark:border-zinc-800',
				...(showSuccess ? ['border-green-400 dark:border-green-800 dark:bg-zinc-950'] : []),
			)}
		>
			<ProblemNumberIcon>{order}</ProblemNumberIcon>
			<div key={submissionProblem.file.id} className="flex items-center gap-2">
				<a href={submissionProblem.file.url} className="hover:underline" target="_blank">
					{submissionProblem.file.name}
				</a>
				<Button variant="ghost" size="sm" className="h-6 p-1" onClick={() => removeFile(submissionProblem.problemId)}>
					<X size={16} />
				</Button>
			</div>
		</div>
	)
}

function useBlobUrl(file: File) {
	const [url, setUrl] = useState<string | undefined>()
	useEffect(() => {
		const url = URL.createObjectURL(file)
		setUrl(url)
		return () => {
			URL.revokeObjectURL(url)
			setUrl(undefined)
		}
	}, [file])
	return url
}
