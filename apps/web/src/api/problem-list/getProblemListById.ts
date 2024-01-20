import { Problem } from 'core/payload-types'
import qs from 'qs'
import { env } from '~/env.mjs'

import { getPayloadToken } from '../auth'
import { handleResponse } from '../handleResponse'

export interface ProblemList {
	id: string
	name: string
	description: string
	type: 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE'
	problems: Problem[]
	createdAt: string
	updatedAt: string
}

interface GetProblemListByIdOptions {
	depth?: number
}

export async function getProblemListById(id: string, opt: GetProblemListByIdOptions = {}): Promise<ProblemList> {
	const { depth = 2 } = opt
	const token = getPayloadToken()

	const queryParams = {
		depth,
	}

	const res = await fetch(`${env.BACKEND_INTERNAL_URL}/api/problem-lists/${id}?${qs.stringify(queryParams)}`, {
		method: 'GET',
		headers: {
			Authorization: `JWT ${token}`,
		},
		next: {
			revalidate: 60, // 1 min
		},
	})

	const data = await handleResponse<ProblemList>(res)
	return data
}
