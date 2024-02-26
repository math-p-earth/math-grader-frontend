'use client'

import { Download } from 'lucide-react'
import { downloadFile } from '~/util/download'

import { Button } from 'ui/components/ui/button'

// either problemListId or sourceId must be provided
type DownloadProblemListButtonProps =
	| {
			problemListId: string
	  }
	| {
			sourceId: string
	  }

export function DownloadProblemSheetButton(props: DownloadProblemListButtonProps) {
	return (
		<Button
			className="flex items-center"
			size="icon"
			variant="outline"
			onClick={(e) => {
				e.stopPropagation()
				let data
				if ('problemListId' in props) {
					data = {
						problemListId: props.problemListId,
					}
				} else if ('sourceId' in props) {
					data = {
						sourceId: props.sourceId,
					}
				} else {
					throw new Error('problemListId or sourceId must be provided')
				}
				downloadFile({
					path: `/problems/download`,
					method: 'POST',
					data,
				})
			}}
		>
			<Download strokeWidth={1.25} />
		</Button>
	)
}
