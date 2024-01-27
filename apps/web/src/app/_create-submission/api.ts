export interface UploadFileArgs {
	problemListId: string
	problemId?: string
	file: File
	signal: AbortSignal
}
export interface SubmissionProblem {
	problem: {
		id: string
		order: string
	}
	files: Array<{
		id: string
		name: string
		url: string
	}>
	createdAt: string
}
export interface UploadFileResult {
	submissions: SubmissionProblem[]
}

interface SubmissionApi {
	uploadFile(args: UploadFileArgs): Promise<UploadFileResult>
}

const mockSubmissionApi = {
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
} satisfies SubmissionApi

export const submissionApi = mockSubmissionApi
