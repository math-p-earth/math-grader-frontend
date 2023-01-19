import useSWR from 'swr'

import { problemFetchResponse, sourceFetchResponse } from '../util/fetchUtil'

export function useSource(sourceId: string | undefined) {
  const { data, error } = useSWR(['/sources/' + sourceId])

  return {
    source: sourceFetchResponse(data),
    problems: data?.problems.map((p: any, index: number) =>
      problemFetchResponse({ ...p, order: index + 1 })
    ),
    isLoading: !data && !error,
    error: error,
  }
}
