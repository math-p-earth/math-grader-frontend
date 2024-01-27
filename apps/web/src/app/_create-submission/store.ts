import { v4 as uuidV4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

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
	startDraft: (args: { problemListId: string; problemListName: string }) => void
	discardDraft: () => void
	discardDraftIfEmpty: () => void

	addUpload: (args: AddUploadArgs) => Promise<void>
	removeUpload: (id: string) => void
	removeFile: (problemId: string, fileId: string) => void
}

export const useCreateSubmissionStore = create(
	persist(
		immer<CreateSubmissionStore>((set, get) => ({
			draft: null,
			startDraft({ problemListId, problemListName }) {
				set((state) => {
					state.draft = {
						problemListId,
						problemListName,
						pendingUploads: {},
						problems: {},
					}
				})
			},
			discardDraft() {
				set((state) => {
					state.draft = null
				})
			},
			discardDraftIfEmpty() {
				const { draft } = get()
				if (!draft) return
				if (Object.keys(draft.problems).length === 0 && Object.keys(draft.pendingUploads).length === 0) {
					set((state) => {
						state.draft = null
					})
				}
			},

			async addUpload({ file, problemId }) {
				const id = uuidV4()
				const { draft } = get()
				if (!draft) return
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
						if (!draft) return
						delete draft.pendingUploads[id]
						for (const submissionProblem of response.submissions) {
							const problemId = submissionProblem.problem.id
							if (!(problemId in draft.problems)) {
								draft.problems[problemId] = submissionProblem
								continue
							}
							draft.problems[problemId]!.files.push(...submissionProblem.files)
						}
					})
				} catch (error) {
					const errorMessage = error instanceof Error ? error.message : 'Unknown error'
					set((state) => {
						state.draft!.pendingUploads[id]!.errorMessage = errorMessage
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
			removeFile(problemId, fileId) {
				set((state) => {
					const { draft } = state
					if (!draft) return
					const problem = draft.problems[problemId]
					if (!problem) return
					problem.files = problem.files.filter((file) => file.id !== fileId)
					if (problem.files.length === 0) {
						delete draft.problems[problemId]
					}
				})
				get().discardDraftIfEmpty()
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
