'use client'

import { useQuery } from '@tanstack/react-query'
import { PayloadErrorResponse, Submission } from 'core/payload-types'
import { PayloadListResponse } from '~/api/types'
import { httpClient } from '~/util/httpClient'

export type GetMySubmissionsResponse = PayloadListResponse<
	Submission & {
		problem: Exclude<Submission['problem'], string>
		student: Exclude<Submission['student'], string>
		file: Exclude<Submission['file'], string>
	}
>

interface UseMySubmissionsOptions {
	depth?: number
	limit?: number
	problemIds?: string[]
}

export const useMySubmissions = (opt: UseMySubmissionsOptions) => {
	const query = useQuery<GetMySubmissionsResponse, PayloadErrorResponse>({
		queryKey: ['my-submissions', opt],
		keepPreviousData: true,
		queryFn: async () => {
			const { depth, limit = 99999999, problemIds } = opt

			const where: Record<string, unknown> = {}
			if (problemIds) {
				where['problem'] = {
					in: problemIds,
				}
			}
			const queryParams = {
				depth,
				limit,
				...{ where },
			}

			const resp = await httpClient.get<GetMySubmissionsResponse>('/submissions', {
				params: queryParams,
			})
			return resp.data
		},
	})

	return query
}
