import useSWR from 'swr'

import {
  ProblemResponseInterface,
  problemFetchResponse,
  sourceFetchResponse,
} from '../util/fetchUtil'

export function useSource(sourceId: string | undefined) {
  const { data, error } = useSWR(['/sources/' + sourceId])

  return {
    source: sourceFetchResponse(data),
    problems: data?.problems.map((p: ProblemResponseInterface) => problemFetchResponse(p)),
    isLoading: !data && !error,
    error: error,
  }
}
