import useSWR from 'swr'

import { Source } from '../types/dto'

export function useSource(sourceId: string | undefined) {
  const { data, error } = useSWR<Source>(['/sources/' + sourceId])

  return {
    source: data,
    isLoading: !data && !error,
    error: error,
  }
}
