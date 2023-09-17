import qs from 'qs'
import { env } from '~/env.mjs'

import { getPayloadToken } from '../auth'
import { handleResponse } from '../handleResponse'
import { PayloadListResponse } from '../types'

export interface ProblemList {
  id: string
  name: string
  description: string
  type: 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE'
  problems: string[] // problem id IF depth = 0
  createdAt: string
  updatedAt: string
}

export type GetProblemListsResponse = PayloadListResponse<ProblemList>

export async function getProblemLists(): Promise<GetProblemListsResponse> {
  const token = getPayloadToken()
  const query = qs.stringify({
    depth: 0,
    limit: 99999999,
  })

  const res = await fetch(`${env.BACKEND_INTERNAL_URL}/api/problem-lists?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
    },
    next: {
      revalidate: 60, // 1 min
    },
  })

  const data = await handleResponse<GetProblemListsResponse>(res)
  return data
}
