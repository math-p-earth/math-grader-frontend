import { env } from '~/env.mjs'
import { Media } from '~/types/payload-types'

import { getPayloadToken } from '../auth'
import { handleResponse } from '../handleResponse'

export async function getMediaById(id: string): Promise<Media> {
  const token = getPayloadToken()

  const res = await fetch(`${env.BACKEND_INTERNAL_URL}/api/media/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `JWT ${token}`,
    },
    next: {
      revalidate: 60, // 1 min
    },
  })

  const data = await handleResponse<Media>(res)
  return data
}
