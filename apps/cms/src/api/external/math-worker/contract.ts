import { initContract } from '@ts-rest/core'
import { Problem, diagramTableDataSchema } from 'core/payload-types'
import { z } from 'zod'

const c = initContract()

export const diagramSchema = z.discriminatedUnion('blockType', [
	z.object({
		blockType: z.literal('diagram-image'),
		imageUrl: z.string(),
		caption: z.string().optional(),
		width: z.number().optional(),
		height: z.number().optional(),
	}),
	z.object({
		blockType: z.literal('diagram-list'),
		itemsPerLine: z.number(),
		items: z.array(
			z.object({
				content: z.string(),
			}),
		),
	}),
	z.object({
		blockType: z.literal('diagram-table'),
		data: diagramTableDataSchema,
	}),
])

export const problemChoiceSchema = z.object({
	choice: z.string(),
	diagrams: z.array(diagramSchema),
})

export const sourceSchema = z.object({
	id: z.string().length(24),
	name: z.string(),
	type: z.enum(['GENERIC', 'BOOK', 'PAPER']),
})

export const problemSchema = z.object({
	id: z.string().length(24),
	content: z.string(),
	type: z.enum(['MCQ', 'SHORT', 'TF', 'PROOF']),
	source: sourceSchema.optional(),
	choices: z.array(problemChoiceSchema),
	diagrams: z.array(diagramSchema),
})

export const problemListSchema = z.object({
	id: z.string().length(24),
	name: z.string(),
	type: z.enum(['DRILL', 'LECTURE_PROBLEM', 'COLLECTION', 'CHALLENGE']),
	problems: z.array(problemSchema),
})

export const problemSheetSchema = z.object({
	name: z.string(),
	problems: z.array(problemSchema),
})
export interface ProblemSheet {
	name: string
	problems: Problem[]
}

export const mathWorkerContract = c.router({
	generateProblemSheetFile: {
		method: 'POST',
		path: '/generate-problem-sheet-file',
		responses: {
			200: z.instanceof(Blob),
		},
		body: z.object({
			userId: z.string().length(24),
			problemSheet: problemSheetSchema,
		}),
	},
	decodeProblemSubmission: {
		method: 'POST',
		path: '/decode-problem-submission',
		contentType: 'multipart/form-data',
		responses: {
			200: c.type<DecodeProblemSubmissionResponse>(),
		},
		body: c.type<FormData>(),
	},
})

interface DecodeProblemSubmissionResponse {
	items: {
		userId: string
		problemId: string
		fileContent: string
	}[]
}
