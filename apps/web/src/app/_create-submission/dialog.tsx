'use client'

import { useEffect, useRef } from 'react'

import { CheckCircle } from 'lucide-react'

import { Button } from 'ui/components/ui/button'
import { Dialog, DialogContent } from 'ui/components/ui/dialog'

import CreateSubmissionDialogContent from './components/dialog-content'
import { useCreateSubmissionStore } from './store'

export function CreateSubmissionDialog() {
	const { draft, showSuccess, discardDraft } = useCreateSubmissionStore()
	const _view = showSuccess ? 'success' : draft
	const view = useLastNonNullValue(_view)

	useEffect(() => {
		useCreateSubmissionStore.persist.rehydrate()
	}, [])

	return (
		<Dialog open={_view !== null}>
			<DialogContent>
				{view === 'success' ? (
					<div className="flex flex-col items-center gap-4">
						<CheckCircle className="text-green-500" size={96} />
						<h1 className="text-2xl font-bold">Submitted Solution</h1>
						<Button onClick={discardDraft}>Close</Button>
					</div>
				) : view ? (
					// TODO: should this be a dynamic component?
					<CreateSubmissionDialogContent draft={view} onCancel={discardDraft} />
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
