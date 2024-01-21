import { Problem, ProblemList, Source } from '.'

export type ProblemType = Problem['type']
export type SourceType = Source['type']
export type ProblemListType = ProblemList['type']

export type PayloadErrorResponse = {
	data?: unknown
	errors: unknown[]
	stack?: string
}
