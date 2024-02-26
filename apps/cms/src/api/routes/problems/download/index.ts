import { APIError, Forbidden } from 'payload/errors'
import { PayloadRequest } from 'payload/types'

import { Problem } from 'core/payload-types'
import { Response } from 'express'
import { z } from 'zod'

import { AuthUser } from '../../../../access/type'
import { withErrorHandler } from '../../../errors/handler/withErrorHandler'
import { mathWorkerClient } from '../../../external/math-worker/client'

export const problemSheetDownloadSchema = z.union([
	z.object({
		problemListId: z.string(),
	}),
	z.object({
		sourceId: z.string(),
	}),
])

async function problemSheetDownloadHandler({ body, payload, user }: PayloadRequest<AuthUser>, res: Response) {
	if (!user) {
		throw new Forbidden()
	}
	const parsedBody = problemSheetDownloadSchema.parse(body)

	let problemSheetName: string
	let problems: Problem[]
	if ('problemListId' in parsedBody) {
		const { problemListId } = parsedBody
		const problemList = await payload.findByID({
			collection: 'problem-lists',
			id: problemListId,
			// impersonate user to use collection access control logic
			overrideAccess: false,
			user: user,
			depth: 2, // include problem list -> problem -> source
		})
		if (!problemList) {
			throw new APIError(`Problem list with id ${problemListId} not found, or you may not have access to it.`, 404)
		}
		problemSheetName = problemList.name
		problems = problemList.problems as Problem[]
	} else if ('sourceId' in parsedBody) {
		const { sourceId } = parsedBody
		const source = await payload.findByID({
			collection: 'sources',
			id: sourceId,
			// impersonate user to use collection access control logic
			overrideAccess: false,
			user: user,
			depth: 2, // include source -> problem -> source
		})
		if (!source) {
			throw new APIError(`Source with id ${sourceId} not found, or you may not have access to it.`, 404)
		}
		problemSheetName = source.name
		problems = (source.problems ?? []) as Problem[]
	} else {
		throw new APIError('Invalid request body', 400)
	}

	const { buffer, headers } = await mathWorkerClient.generateProblemSheetFile(user.id, {
		name: problemSheetName,
		problems,
	})
	res.setHeader('Content-Type', headers.get('Content-Type') ?? 'application/pdf')
	res.setHeader(
		'Content-Disposition',
		headers.get('Content-Disposition') ?? `attachment; filename=${problemSheetName}.pdf`,
	)
	res.send(buffer)
}

export default withErrorHandler(problemSheetDownloadHandler)
