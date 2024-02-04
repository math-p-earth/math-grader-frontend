import { initClient } from '@ts-rest/core'
import { ProblemList } from 'core/payload-types'

import { MATH_WORKER_URL } from '../../../config'
import { mathWorkerContract } from './contract'
import { mapProblemListToContract } from './mapper'

const rawClient = initClient(mathWorkerContract, {
	baseUrl: MATH_WORKER_URL,
	baseHeaders: {},
})

interface GenerateProblemListFileResult {
	buffer: Buffer
	headers: Headers
}

export interface DecodeProblemSubmissionResultItem {
	userId: string
	problemId: string
	fileContent: Buffer
}

export interface DecodeProblemSubmissionResult {
	items: DecodeProblemSubmissionResultItem[]
}

export const mathWorkerClient = {
	/**
	 * @param userId user id
	 * @param problemList ProblemList with depth >= 2
	 */
	generateProblemListFile: async (userId: string, problemList: ProblemList): Promise<GenerateProblemListFileResult> => {
		const response = await rawClient.generateProblemListFile({
			body: {
				userId,
				problemList: mapProblemListToContract(problemList),
			},
		})

		if (response.status !== 200) {
			throw new Error(`Failed to generate problem list file: ${JSON.stringify(response.body, null, 2)}`)
		}

		const buffer = Buffer.from(await response.body.arrayBuffer())

		return {
			buffer: buffer,
			headers: response.headers,
		}
	},

	decodeProblemSubmission: async (file: Blob): Promise<DecodeProblemSubmissionResult> => {
		const body = new FormData()
		body.append('file', file)
		const response = await rawClient.decodeProblemSubmission({
			body,
		})

		if (response.status !== 200) {
			throw new Error(`Failed to decode problem submission: ${JSON.stringify(response.body, null, 2)}`)
		}
		return {
			items: response.body.items.map<DecodeProblemSubmissionResultItem>((item) => ({
				userId: item.userId,
				problemId: item.problemId,
				fileContent: Buffer.from(item.fileContent, 'base64'),
			})),
		}
	},
}
