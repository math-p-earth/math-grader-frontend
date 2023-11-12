import qs from 'qs'
import { env } from '~/env.mjs'
import { Problem } from '~/types/payload-types'

import { getPayloadToken } from '../auth'
import { handleResponse } from '../handleResponse'

export interface Source {
  id: string
  name: string
  description?: string
  type: 'GENERIC' | 'BOOK' | 'PAPER'
  problems: Problem[]
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

interface GetSourceByIdOptions {
  depth?: number
}

export async function getSourceById(id: string, opt: GetSourceByIdOptions = {}): Promise<Source> {
  const { depth = 1 } = opt
  const token = getPayloadToken()

  const queryParams = {
    depth,
  }

  const res = await fetch(
    `${env.BACKEND_INTERNAL_URL}/api/sources/${id}?${qs.stringify(queryParams)}`,
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

  const data = await handleResponse<Source>(res)
  return data
}
