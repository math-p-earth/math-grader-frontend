import qs from 'qs'
import { env } from '~/env.mjs'

import { getPayloadToken } from '../auth'
import { handleResponse } from '../handleResponse'
import { PayloadListResponse } from '../types'

export interface Source {
  id: string
  name: string
  description?: string
  type: 'GENERIC' | 'BOOK' | 'PAPER'
  problems: string[] // problem id IF depth = 0
  book: {
    author: string
    isbn: string
  }
  paper: {
    timeLimit: number
    datePublished: string
  }
  createdAt: string
  updatedAt: string
}

export type GetSourcesResponse = PayloadListResponse<Source>

export async function getSources(): Promise<GetSourcesResponse> {
  const token = getPayloadToken()
  const query = qs.stringify({
    depth: 0,
    limit: 99999999,
  })

  const res = await fetch(`${env.BACKEND_INTERNAL_URL}/api/sources?${query}`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
    },
    next: {
      revalidate: 60, // 1 min
    },
  })

  const data = await handleResponse<GetSourcesResponse>(res)
  return data
}