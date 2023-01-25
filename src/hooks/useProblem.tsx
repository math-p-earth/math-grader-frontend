import useSWR from 'swr'

import { ProblemDto } from '../types/dto'
import { ProblemResponseInterface, problemFetchResponse } from '../util/fetchUtil'

export function useProblem(sourceId: string | undefined) {
  const { data, error } = useSWR(['/problems?where[source][equals]=' + sourceId])

  return {
    problems: data?.docs
      ? data.docs.map((pb: ProblemResponseInterface) => problemFetchResponse(pb))
      : ([] as ProblemDto[]),
    isLoading: !data && !error,
    error: error,
  }
}
