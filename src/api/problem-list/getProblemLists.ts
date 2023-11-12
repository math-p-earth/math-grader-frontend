import qs from 'qs'
import { env } from '~/env.mjs'
import { Problem } from '~/types/payload-types'

import { getPayloadToken } from '../auth'
import { handleResponse } from '../handleResponse'
import { PayloadListResponse } from '../types'

export interface ProblemList {
  id: string
  name: string
  description: string
  type: 'DRILL' | 'LECTURE_PROBLEM' | 'COLLECTION' | 'CHALLENGE'
  problems: string[] | Problem[]
  createdAt: string
  updatedAt: string
}

export type GetProblemListsResponse = PayloadListResponse<ProblemList>

interface GetProblemListsOptions {
  depth?: number
  limit?: number
}

export async function getProblemLists(
  opt: GetProblemListsOptions = {}
): Promise<GetProblemListsResponse> {
  const { depth = 0, limit = 99999999 } = opt
  const token = getPayloadToken()
  const queryParams = {
    depth,
    limit,
  }

  const res = await fetch(
    `${env.BACKEND_INTERNAL_URL}/api/problem-lists?${qs.stringify(queryParams)}`,
    {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
      next: {
        revalidate: 60, // 1 min
      },
    }
  )

  const data = await handleResponse<GetProblemListsResponse>(res)
  return data
}
