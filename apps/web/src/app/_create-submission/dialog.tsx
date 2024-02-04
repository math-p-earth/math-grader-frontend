'use client'

import { useEffect, useRef } from 'react'

import { Dialog, DialogContent } from 'ui/components/ui/dialog'

import CreateSubmissionDialogContent from './components/dialog-content'
import { useCreateSubmissionStore } from './store'

export function CreateSubmissionDialog() {
	const { draft, showSuccess, discardDraft } = useCreateSubmissionStore()
	const _view = showSuccess ? 'success' : draft
	const view = useLastNonNullValue(draft)

	useEffect(() => {
		useCreateSubmissionStore.persist.rehydrate()
	}, [])

	return (
		<Dialog open={_view !== null}>
			<DialogContent className="max-w-4xl">
				{view ? <CreateSubmissionDialogContent draft={view} onCancel={discardDraft} /> : null}
			</DialogContent>
		</Dialog>
	)
}

function useLastNonNullValue<T>(value: T | null) {
	const lastNonNullValue = useRef(value)
	if (value !== null) {
		lastNonNullValue.current = value
	}
	return lastNonNullValue.current
}
