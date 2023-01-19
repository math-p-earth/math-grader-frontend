import useSWR from 'swr'

import { SourceType } from '../types/dto'
import { sourceFetchResponse } from '../util/fetchUtil'

export function useSourceList(type?: SourceType) {
  const { data, error } = useSWR(['/sources'])

  return {
    sources: data?.docs.map((s: any) => sourceFetchResponse(s)),
    isLoading: !data && !error,
    error: error,
  }
}
