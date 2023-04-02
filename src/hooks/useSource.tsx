import useSWR from 'swr'

import { Source } from '../types/dto'

export function useSource(sourceId: string) {
  const { data, error } = useSWR<Source>([`/sources/${sourceId}?depth=1`])

  return {
    source: data,
    isLoading: !data && !error,
    error: error,
  }
}
