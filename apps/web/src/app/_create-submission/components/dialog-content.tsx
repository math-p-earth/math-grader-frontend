import { useEffect, useMemo, useState } from 'react'

import { Loader2, Upload, X } from 'lucide-react'

import { Button } from 'ui/components/ui/button'
import { DialogDescription, DialogFooter, DialogHeader, DialogTitle } from 'ui/components/ui/dialog'
import { cn } from 'ui/lib/utils'

import { DraftSubmission, PendingUpload, useCreateSubmissionStore } from '../store'

type Item = {
	type: 'pendingUpload'
	pendingUpload: PendingUpload
	createdAt: Date
}

export default function CreateSubmissionDialogContent({
	draft,
	onCancel,
}: {
	draft: DraftSubmission
	onCancel: () => void
}) {
	const items = useMemo(() => {
		return Object.values(draft.pendingUploads)
			.map(
				(pendingUpload): Item => ({
					type: 'pendingUpload',
					pendingUpload: pendingUpload,
					createdAt: new Date(pendingUpload.createdAt),
				}),
			)
			.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
	}, [draft.pendingUploads])
	return (
		<div className="flex flex-col gap-4">
			<DialogHeader>
				<DialogTitle>Submit solution</DialogTitle>
				<DialogDescription>{draft.problemListName}</DialogDescription>
			</DialogHeader>
			<div className="flex flex-col gap-2">
				{items.map((item) => (
					<PendingUploadView key={item.pendingUpload.id} pendingUpload={item.pendingUpload} />
				))}
			</div>
			<DialogFooter className="flex-row-reverse">
				<Button variant="outline">
					<Upload size={16} className="mr-2" />
					Add More
				</Button>
				<span className="sm:flex-1" />
				<Button variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit">Submit</Button>
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
				errorMessage ? 'dark:border-red-800 dark:bg-red-950 dark:text-red-200' : '',
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
