import useSWR from 'swr'

import { Source } from '../types/dto'

export function useSourceList() {
  const { data, error } = useSWR(['/sources'])

  return {
    sources: data?.docs as Source[],
    isLoading: !data && !error,
    error: error,
  }
}
