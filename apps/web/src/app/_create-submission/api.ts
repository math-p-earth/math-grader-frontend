export interface UploadFileArgs {
	problemListId: string
	problemId?: string
	file: File
	signal: AbortSignal
}
export interface SubmissionProblem {
	problem: {
		id: string
	}
	files: Array<{
		id: string
		url: string
	}>
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
		return {
			submissions: [
				{
					problem: {
						id: args.file.name,
					},
					files: [
						{
							id: 'mock-file-1',
							url: 'mock-file-url-1',
						},
						{
							id: 'mock-file-2',
							url: 'mock-file-url-2',
						},
					],
				},
			],
		} satisfies UploadFileResult
	},
} satisfies SubmissionApi

export const submissionApi = mockSubmissionApi
