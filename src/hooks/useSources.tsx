import useSWR from 'swr'

import { Source } from '../types/dto'

interface SourcesResponse {
  docs: Source[]
}

export function useSources() {
  const { data, error } = useSWR<SourcesResponse>(['/sources'])

  return {
    sources: data?.docs,
    isLoading: !data && !error,
    error: error,
  }
}
