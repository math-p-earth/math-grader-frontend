import { toast } from 'sonner'
import { v4 as uuidV4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { errorIsPayloadError } from '~/util/axios/error'

import { SubmissionProblem, submissionApi } from './api'

export interface PendingUpload {
	id: string
	file: File
	abortController: AbortController
	createdAt: string
	errorMessage?: string
}

export interface DraftSubmission {
	problemListId: string
	problemListName: string

	pendingUploads: Record<string, PendingUpload>
	problems: Record<string, SubmissionProblem>
}

export interface AddUploadArgs {
	file: File
	problemId?: string
}

interface CreateSubmissionStore {
	draft: DraftSubmission | null
	isSubmitting: boolean
	showSuccess: boolean

	startDraft: (args: { problemListId: string; problemListName: string }) => void
	discardDraft: () => void
	discardDraftIfEmpty: () => void

	addUpload: (args: AddUploadArgs) => Promise<void>
	removeUpload: (id: string) => void
	removeFile: (problemId: string) => void

	submit: () => Promise<void>
}

export const useCreateSubmissionStore = create(
	persist(
		immer<CreateSubmissionStore>((set, get) => ({
			draft: null,
			isSubmitting: false,
			showSuccess: false,

			startDraft({ problemListId, problemListName }) {
				set((state) => {
					state.draft = {
						problemListId,
						problemListName,
						pendingUploads: {},
						problems: {},
					}
					state.showSuccess = false
				})
			},
			discardDraft() {
				set((state) => {
					state.draft = null
					state.showSuccess = false
				})
			},
			discardDraftIfEmpty() {
				const { draft, discardDraft } = get()
				if (!draft) {
					return
				}
				if (Object.keys(draft.problems).length === 0 && Object.keys(draft.pendingUploads).length === 0) {
					discardDraft()
				}
			},

			async addUpload({ file, problemId }) {
				const id = uuidV4()
				const { draft } = get()
				if (!draft) {
					return
				}
				const abortController = new AbortController()
				set((state) => {
					state.draft!.pendingUploads[id] = {
						id,
						file,
						abortController,
						createdAt: new Date().toISOString(),
					}
				})
				try {
					const response = await submissionApi.uploadFile({
						problemListId: draft.problemListId,
						problemId,
						file,
						signal: abortController.signal,
					})
					set((state) => {
						const { draft } = state
						if (!draft) {
							return
						}
						delete draft.pendingUploads[id]
						for (const submissionProblem of response.submissions) {
							const problemId = submissionProblem.problemId
							if (!(problemId in draft.problems)) {
								draft.problems[problemId] = submissionProblem
								continue
							}
							draft.problems[problemId]!.file = submissionProblem.file
						}
					})
				} catch (error) {
					let message: string
					if (errorIsPayloadError(error) && error.response.data.errors.length > 0) {
						message = error.response.data.errors[0]!.message
					} else if (error instanceof Error) {
						message = error.message
					} else {
						message = 'Unknown error'
					}
					set((state) => {
						state.draft!.pendingUploads[id]!.errorMessage = message
					})
				}
			},
			removeUpload(id) {
				set((state) => {
					state.draft?.pendingUploads[id]?.abortController.abort()
					delete state.draft!.pendingUploads[id]
				})
				get().discardDraftIfEmpty()
			},
			removeFile(problemId) {
				set((state) => {
					const { draft } = state
					if (!draft) {
						return
					}
					const problem = draft.problems[problemId]
					if (!problem) {
						return
					}
					delete draft.problems[problemId]
				})
				get().discardDraftIfEmpty()
			},

			async submit() {
				if (get().isSubmitting) {
					return
				}
				set((state) => {
					state.isSubmitting = true
				})
				try {
					const { draft } = get()
					if (!draft) {
						return
					}
					const submissions = Object.values(draft.problems).map((problem) => ({
						problemId: problem.problemId,
						fileId: problem.file.id,
					}))

					await submissionApi.createSubmissions({ items: submissions })
					set((state) => {
						state.showSuccess = true
					})
					toast.success(`Created ${submissions.length} submissions.`)
				} catch (error) {
					let message: string
					if (errorIsPayloadError(error) && error.response.data.errors.length > 0) {
						message = error.response.data.errors[0]!.message
					} else if (error instanceof Error) {
						message = error.message
					} else {
						message = 'Unknown error'
					}
					console.error(error)
					toast.error(`Failed to create submissions: ${message}`)
				} finally {
					set((state) => {
						state.isSubmitting = false
					})
				}
			},
		})),
		{
			name: 'create-submission-store',
			skipHydration: true,
			partialize(state) {
				if (!state.draft) return state
				return {
					draft: {
						...state.draft,
						pendingUploads: {},
					},
				}
			},
			onRehydrateStorage() {
				return (state) => {
					state?.discardDraftIfEmpty()
				}
			},
		},
	),
)
