'use client'

import { ReactNode, createContext, useCallback, useContext } from 'react'
import { useDropzone } from 'react-dropzone'

import { Slot } from '@radix-ui/react-slot'

import { cn } from 'ui/lib/utils'

import { useCreateSubmissionStore } from '../store'

export interface SubmissionInputProps {
	headerLabel?: string
	problemId?: string
	children: ReactNode
}

interface SubmissionInputContextValue {
	open: () => void
}

const SubmissionInputContext = createContext<SubmissionInputContextValue | null>(null)

export function SubmissionInput(props: SubmissionInputProps) {
	const { startDraft, addUpload } = useCreateSubmissionStore()
	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			if (acceptedFiles.length === 0) return
			startDraft({
				headerLabel: props.headerLabel,
			})
			for (const file of acceptedFiles) {
				addUpload({ file, problemId: props.problemId })
			}
		},
		[startDraft, addUpload, props.headerLabel, props.problemId],
	)
	const { getRootProps, getInputProps, isDragAccept, open } = useDropzone({ onDrop, noClick: true, noKeyboard: true })

	return (
		<SubmissionInputContext.Provider value={{ open }}>
			<div className="relative" {...getRootProps()}>
				<input {...getInputProps()} />
				{props.children}
				<div
					className={cn(
						'pointer-events-none absolute inset-0 rounded-lg bg-green-500 opacity-0 transition-opacity',
						isDragAccept && 'opacity-10',
					)}
				/>
			</div>
		</SubmissionInputContext.Provider>
	)
}

export function SubmissionInputTrigger({ children }: { children: ReactNode }) {
	const value = useContext(SubmissionInputContext)
	if (!value) return null

	return <Slot onClick={value.open}>{children}</Slot>
}
