import { APIError, Forbidden } from 'payload/errors'
import { PayloadRequest } from 'payload/types'

import { Problem, Submission, Upload } from 'core/payload-types'
import { Response } from 'express'
import { z } from 'zod'

import { AuthUser, isTypeStudent } from '../../../../access/type'
import { withErrorHandler } from '../../../errors/handler/withErrorHandler'

export const submissionConfirmUploadSchema = z.object({
	items: z.array(
		z.object({
			problemId: z.string(),
			fileId: z.string(),
		}),
	),
})

async function submissionConfirmUploadHandler(req: PayloadRequest<AuthUser>, res: Response) {
	const { body, payload, user } = req
	if (!user) {
		throw new Forbidden()
	}
	if (!isTypeStudent(user)) {
		throw new APIError('Only students can submit', 400)
	}

	const { items } = submissionConfirmUploadSchema.parse(body)

	// validate inputs exist
	const problemIds = items.map((s) => s.problemId)
	const fileIds = items.map((s) => s.fileId)
	const now = new Date()
	const [problemsResult, uploadsResult] = await Promise.all([
		payload.find({
			collection: 'problems',
			where: {
				id: {
					in: problemIds,
				},
			},
			pagination: false,
		}),
		payload.find({
			collection: 'uploads',
			where: {
				id: {
					in: fileIds,
				},
				canExpire: {
					equals: true,
				},
				expiresAt: {
					greater_than: now.toISOString(),
				},
			},
			pagination: false,
		}),
	])
	const problems = problemsResult.docs.reduce<Record<string, Problem>>((acc, p) => {
		acc[p.id] = p
		return acc
	}, {})
	const uploads = uploadsResult.docs.reduce<Record<string, Upload>>((acc, f) => {
		acc[f.id] = f
		return acc
	}, {})
	const invalidProblemIds = problemIds.filter((id) => !(id in problems))
	const invalidFileIds = fileIds.filter((id) => !(id in uploads))
	if (invalidProblemIds.length > 0) {
		throw new APIError(`Problem ids not found: ${invalidProblemIds.join(', ')}`, 400)
	}
	if (invalidFileIds.length > 0) {
		throw new APIError(`Pending file ids not found: ${invalidFileIds.join(', ')}`, 400)
	}

	// create submissions
	const submissions = await Promise.all(
		items.map(async (item): Promise<Submission> => {
			const upload = uploads[item.fileId]
			await payload.update({
				collection: 'uploads',
				id: upload.id,
				data: {
					canExpire: false,
				},
			})
			const submission = await payload.create({
				collection: 'submissions',
				data: {
					problem: item.problemId,
					student: user.id,
					status: 'PENDING',
					file: item.fileId,
					createdAt: now.toISOString(),
					updatedAt: now.toISOString(),
				},
			})
			return submission
		}),
	)

	res.json({ submissions })
}

export default withErrorHandler(submissionConfirmUploadHandler)
