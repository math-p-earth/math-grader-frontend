import React from 'react'

import { useDocumentDrawer } from 'payload/dist/admin/components/elements/DocumentDrawer'
import Edit from 'payload/dist/admin/components/icons/Edit'

import { Problems } from '../../../../collections/Problems'

interface EditProblemButtonProps {
	problemId: string
	refreshData?: () => void
}

export function EditProblemButton({ problemId, refreshData }: EditProblemButtonProps) {
	const [DocumentDrawer, DocumentDrawerToggler] = useDocumentDrawer({
		id: problemId,
		collectionSlug: Problems.slug,
	})
	return (
		<div>
			<DocumentDrawerToggler>
				<Edit />
			</DocumentDrawerToggler>
			<DocumentDrawer
				onSave={
					refreshData
						? () => {
								refreshData()
						  }
						: undefined
				}
			/>
		</div>
	)
}
