export interface UploadFileArgs {
	// problem list id of the submission
	problemListId: string
	// problem id, only available if user triggered submit from a problem
	// maybe use as a hint if there is no data matrix in the file
	problemId?: string
	file: File
	// abort signal for the upload request
	signal: AbortSignal
}
export interface SubmissionProblem {
	// problem associated with the submission
	problem: {
		id: string
		// the order to show in the submission list ui
		order: string
	}
	files: Array<{
		// for reference in the actual submission
		id: string
		// shown in the submission list ui
		name: string
		// preview url
		url: string
	}>
	createdAt: string
}
export interface UploadFileResult {
	// problems detected in the uploaded file
	submissions: SubmissionProblem[]
}
export interface CreateSubmissionsArgs {
	submissions: Array<{ problemId: string; fileIds: string[] }>
}

interface SubmissionApi {
	uploadFile(args: UploadFileArgs): Promise<UploadFileResult>
	createSubmissions(args: CreateSubmissionsArgs): Promise<void>
}

const mockSubmissionApi: SubmissionApi = {
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
					problem: {
						id: problemId,
						order: '1',
					},
					files: [
						{
							id: 'mock-file-1',
							name: 'mock-file-1',
							url: 'mock-file-url-1',
						},
						{
							id: 'mock-file-2',
							name: 'mock-file-2',
							url: 'mock-file-url-2',
						},
					],
					createdAt: new Date().toISOString(),
				},
			],
		} satisfies UploadFileResult
	},
	async createSubmissions() {
		await new Promise((resolve) => setTimeout(resolve, 1000))
	},
}

export const submissionApi = mockSubmissionApi
