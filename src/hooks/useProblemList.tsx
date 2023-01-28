import useSWR from 'swr'

import { ProblemList } from '../types/dto'

export function useProblemList(id: string | undefined) {
  const { data, error } = useSWR<ProblemList>(['/problem-lists/' + id])

  return {
    problemList: data,
    isLoading: !data && !error,
    error: error,
  }
}
