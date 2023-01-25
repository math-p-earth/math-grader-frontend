import useSWR from 'swr'

import { SourceResponseInterface, sourceFetchResponse } from '../util/fetchUtil'

export function useSourceList() {
  const { data, error } = useSWR(['/sources'])

  return {
    sources: data?.docs.map((s: SourceResponseInterface) => sourceFetchResponse(s)),
    isLoading: !data && !error,
    error: error,
  }
}
