'use client'

import { useQuery } from '@tanstack/react-query'
import { Media, PayloadErrorResponse } from '~/types/payload-types'
import { httpClient } from '~/util/httpClient'

export interface useQueryMediaOptions {
  image: string | Media
}

export const useQueryMedia = ({ image }: useQueryMediaOptions) => {
  const query = useQuery<Media, PayloadErrorResponse>({
    queryKey: ['media', image],
    keepPreviousData: true,
    queryFn: async () => {
      // if image is not string, treat as Media, no need to query
      if (typeof image !== 'string') {
        return image
      }

      // if image is string, treat as id
      const res = httpClient.get<Media>(`/media/${image}`)
      return (await res).data
    },
  })

  return { query }
}
