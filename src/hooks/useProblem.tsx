import useSWR from 'swr'

import { Problem } from '../types/dto'

export function useProblem(sourceId: string | undefined) {
  const { data, error } = useSWR<Problem>(['/problems?where[source][equals]=' + sourceId])

  return {
    problems: data,
    isLoading: !data && !error,
    error: error,
  }
}
