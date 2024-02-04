'use client'

import { useQuery } from '@tanstack/react-query'
import { PayloadErrorResponse, ProblemList } from 'core/payload-types'
import { httpClient } from '~/util/httpClient'

export type GetProblemListResponse = ProblemList & {
	problems: Exclude<ProblemList['problems'], string[]>
}

interface UseProblemListOptions {
	id: string
	depth?: number
}

export const useProblemList = (opt: UseProblemListOptions) => {
	const query = useQuery<GetProblemListResponse, PayloadErrorResponse>({
		queryKey: ['problem-list', JSON.stringify(opt)],
		keepPreviousData: true,
		queryFn: async () => {
			const { id, depth = 2 } = opt

			const queryParams = {
				depth,
			}

			const resp = await httpClient.get<GetProblemListResponse>(`/submissions/${id}`, {
				params: queryParams,
			})
			return resp.data
		},
	})

	return query
}
