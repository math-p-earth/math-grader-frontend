import useSWR from 'swr'

import { Source } from '../../types/payload-types'

export function useSource(sourceId: string) {
  const { data, error } = useSWR<Source>([`/sources/${sourceId}`])

  return {
    source: data,
    isLoading: !data && !error,
    error: error,
  }
}
