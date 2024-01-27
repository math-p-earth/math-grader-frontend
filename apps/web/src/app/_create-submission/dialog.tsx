'use client'

import { useEffect, useRef } from 'react'

import { Dialog, DialogContent } from 'ui/components/ui/dialog'

import CreateSubmissionDialogContent from './components/dialog-content'
import { useCreateSubmissionStore } from './store'

export function CreateSubmissionDialog() {
	const { draft: _draft, discardDraft } = useCreateSubmissionStore()
	const draft = useLastNonNullValue(_draft)

	useEffect(() => {
		useCreateSubmissionStore.persist.rehydrate()
	}, [])

	return (
		<Dialog open={_draft !== null}>
			<DialogContent>
				{draft ? (
					// TODO: should this be a dynamic component?
					<CreateSubmissionDialogContent draft={draft} onCancel={discardDraft} />
				) : null}
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
