'use client'

import { Download } from 'lucide-react'
import { downloadFile } from '~/util/download'

import { Button } from 'ui/components/ui/button'

interface DownloadProblemListButtonProps {
	problemListId: string
}

export function DownloadProblemListButton({ problemListId }: DownloadProblemListButtonProps) {
	return (
		<Button
			className="flex items-center"
			size="icon"
			variant="outline"
			onClick={(e) => {
				e.stopPropagation()
				downloadFile({
					path: `/problem-lists/${problemListId}/download`,
				})
			}}
		>
			<Download strokeWidth={1.25} />
		</Button>
	)
}
