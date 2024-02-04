import { APIError, Forbidden } from 'payload/errors'
import { PayloadRequest } from 'payload/types'

import { Response } from 'express'
import type { UploadedFile } from 'express-fileupload'
import { z } from 'zod'

import { AuthUser } from '../../../../access/type'
import { PUBLIC_URL } from '../../../../config'
import { withErrorHandler } from '../../../errors/handler/withErrorHandler'
import { mathWorkerClient } from '../../../external/math-worker/client'

export const submissionUploadPendingSchema = z.object({
	problemListId: z.string(),
	problemId: z.string().optional(),
})

interface SubmissionProblem {
	// problem associated with the submission
	problemId: string
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
interface SubmissionUploadPendingResponse {
	// problems detected in the uploaded file
	submissions: SubmissionProblem[]
}

async function submissionUploadPendingHandler({ body, payload, user, files }: PayloadRequest<AuthUser>, res: Response) {
	if (!user) {
		throw new Forbidden()
	}
	if (!files?.file) {
		throw new APIError('No file uploaded', 400)
	}
	const file = files.file as UploadedFile
	if (file.mimetype !== 'application/pdf') {
		throw new APIError('Only PDF files are supported', 400)
	}

	const { problemListId, problemId } = submissionUploadPendingSchema.parse(body)
	const problemList = await payload.findByID({
		collection: 'problem-lists',
		id: problemListId,
		// impersonate user to use collection access control logic
		overrideAccess: false,
		user: user,
		depth: 0, // no need for depth, only checking for existence
	})
	if (!problemList) {
		throw new APIError(`Problem list with id ${problemListId} not found, or you may not have access to it.`, 404)
	}

	// TODO: support upload for specific problemId
	if (typeof problemId !== 'undefined') {
		throw new Error('upload for specific problemId not implemented yet')
	}

	// create pending uploads

	const { items } = await mathWorkerClient.decodeProblemSubmission(new Blob([file.data]))
	const pendingUploads = await Promise.all(
		items.map((item) =>
			payload.create({
				collection: 'pending-uploads',
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
					expiresAt: new Date(Date.now() + 1000 * 60 * 60).toISOString(), // 1 hour
				},
			}),
		),
	)

	const resp: SubmissionUploadPendingResponse = {
		submissions: pendingUploads.map<SubmissionProblem>((uploadItem, idx) => ({
			problemId: items[idx].problemId,
			files: [
				{
					id: uploadItem.id,
					name: uploadItem.filename!,
					url: `${PUBLIC_URL}${uploadItem.url}`,
				},
			],
			createdAt: uploadItem.createdAt,
		})),
	}
	res.json(resp)
}

export default withErrorHandler(submissionUploadPendingHandler)
