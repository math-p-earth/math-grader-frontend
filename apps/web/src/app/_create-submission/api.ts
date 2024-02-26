import { httpClient } from '~/util/httpClient'

export interface UploadFileArgs {
	// problem id, only available if user triggered submit from a problem
	// used to indicate single problem upload if defined
	problemId?: string
	file: File
	// abort signal for the upload request
	signal: AbortSignal
}
export interface SubmissionProblem {
	// problem associated with the submission
	problemId: string
	file: {
		// for reference in the actual submission
		id: string
		// shown in the submission list ui
		name: string
		// preview url
		url: string
	}
	createdAt: string
}
export interface UploadFileResult {
	// problems detected in the uploaded file
	submissions: SubmissionProblem[]
}
export interface CreateSubmissionsArgs {
	items: Array<{ problemId: string; fileId: string }>
}

interface SubmissionApi {
	uploadFile(args: UploadFileArgs): Promise<UploadFileResult>
	createSubmissions(args: CreateSubmissionsArgs): Promise<void>
}

const _mockSubmissionApi: SubmissionApi = {
	async uploadFile(args) {
		await new Promise((resolve) => setTimeout(resolve, 1000))
		if (args.file.name === 'error.pdf') {
			throw new Error('mock error')
		}
		let problemId: string
		if (args.problemId === undefined) {
			// submit from list case, detect problem id from file name
			if (args.file.name === 'unknown.pdf') {
				// simulate unknown problem id (no data matrix in uploaded file)
				throw new Error('unknown problem id')
			} else {
				problemId = args.file.name
			}
		} else {
			// submit from problem case, simulate problem id check
			if (args.file.name !== 'unknown.pdf' && args.file.name !== `${args.problemId}.pdf`) {
				throw new Error('problem id mismatch')
			}
			problemId = args.problemId
		}
		return {
			submissions: [
				{
					problemId,
					file: {
						id: 'mock-file-1',
						name: 'mock-file-1',
						url: 'mock-file-url-1',
					},
					createdAt: new Date().toISOString(),
				},
			],
		} satisfies UploadFileResult
	},
	async createSubmissions() {
		await new Promise((resolve) => setTimeout(resolve, 1000))
	},
}

export const submissionApi: SubmissionApi = {
	async uploadFile({ file, signal, problemId }) {
		const formData = new FormData()
		formData.append('file', file)
		if (typeof problemId !== 'undefined') {
			formData.append('problemId', problemId)
		}

		const response = await httpClient.post<UploadFileResult>('/submissions/upload-pending', formData, {
			signal,
		})
		return response.data
	},

	async createSubmissions({ items }) {
		await httpClient.post('/submissions/confirm-upload', { items })
	},
}
