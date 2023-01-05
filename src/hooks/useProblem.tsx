import useSWR from 'swr'

import { ProblemDto } from '../types/dto'
import { problemFetchResponse } from '../util/fetchUtil'

export function useProblem(sourceId: string | undefined) {
  const { data, error } = useSWR(['/problems?where[source][equals]=' + sourceId])

  return {
    problems: data?.docs
      ? data.docs.map((pb: any) => problemFetchResponse(pb))
      : ([] as ProblemDto[]),
    isLoading: !data && !error,
    error: error,
  }
}
