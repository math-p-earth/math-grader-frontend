import { env } from '~/env.mjs'
import { Problem } from '~/types/payload-types'

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

export async function getProblemListById(id: string): Promise<ProblemList> {
  const token = getPayloadToken()

  const res = await fetch(`${env.BACKEND_INTERNAL_URL}/api/problem-lists/${id}`, {
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
