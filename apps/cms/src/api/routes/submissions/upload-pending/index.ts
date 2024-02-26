import { APIError, Forbidden } from 'payload/errors'
import { PayloadRequest } from 'payload/types'

import { Response } from 'express'
import type { UploadedFile } from 'express-fileupload'
import { z } from 'zod'

import { AuthUser, isTypeStudent } from '../../../../access/type'
import { PUBLIC_URL } from '../../../../config'
import { withErrorHandler } from '../../../errors/handler/withErrorHandler'
import { DecodeProblemSubmissionResultItem, mathWorkerClient } from '../../../external/math-worker/client'

export const submissionUploadPendingSchema = z.object({
	problemId: z.string().optional(),
})

interface SubmissionProblem {
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
interface SubmissionUploadPendingResponse {
	// problems detected in the uploaded file
	submissions: SubmissionProblem[]
}

async function submissionUploadPendingHandler({ body, payload, user, files }: PayloadRequest<AuthUser>, res: Response) {
	if (!user) {
		throw new Forbidden()
	}
	if (!isTypeStudent(user)) {
		throw new APIError('Only students can submit', 400)
	}
	if (!files?.file) {
		throw new APIError('No file uploaded', 400)
	}
	const file = files.file as UploadedFile
	if (file.mimetype !== 'application/pdf') {
		throw new APIError('Only PDF files are supported', 400)
	}

	const { problemId } = submissionUploadPendingSchema.parse(body)

	let items: DecodeProblemSubmissionResultItem[] = []
	if (typeof problemId !== 'undefined') {
		items = [
			{
				problemId,
				fileContent: file.data,
				userId: user.id,
			},
		]
	} else {
		const result = await mathWorkerClient.decodeProblemSubmission(new Blob([file.data]))
		items = result.items
	}
	// TODO: filter out problems that user cannot access, so they can't create submission for them

	// create pending uploads
	const uploads = await Promise.all(
		items.map((item) =>
			payload.create({
				collection: 'uploads',
				file: {
					data: item.fileContent,
					mimetype: 'application/pdf',
					name: `submission_${item.problemId}_${item.userId}_${Date.now()}.pdf`,
					size: item.fileContent.byteLength,
				},
				data: {
					owner: {
						relationTo: user.collection,
						value: user.id,
					},
					canExpire: true,
					expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour
				},
			}),
		),
	)

	const resp: SubmissionUploadPendingResponse = {
		submissions: uploads.map<SubmissionProblem>((uploadItem, idx) => ({
			problemId: items[idx].problemId,
			file: {
				id: uploadItem.id,
				name: uploadItem.filename!,
				url: `${PUBLIC_URL}${uploadItem.url}`,
			},
			createdAt: uploadItem.createdAt,
		})),
	}
	res.json(resp)
}

export default withErrorHandler(submissionUploadPendingHandler)
