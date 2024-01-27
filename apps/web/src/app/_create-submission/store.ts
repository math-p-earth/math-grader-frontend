import { v4 as uuidV4 } from 'uuid'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface PendingUpload {
	id: string
	file: File
	abortController: AbortController
	createdAt: string
}

export interface DraftSubmission {
	problemListId: string
	problemListName: string

	pendingUploads: Record<string, PendingUpload>
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

	addUpload: (args: AddUploadArgs) => void
	removeUpload: (id: string) => void
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
				if (Object.keys(draft.pendingUploads).length === 0) {
					set((state) => {
						state.draft = null
					})
				}
			},

			addUpload({ file }) {
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
			},
			removeUpload(id) {
				set((state) => {
					state.draft?.pendingUploads[id]?.abortController.abort()
					delete state.draft!.pendingUploads[id]
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
