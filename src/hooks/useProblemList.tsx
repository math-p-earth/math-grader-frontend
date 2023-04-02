import useSWR from 'swr'

import { ProblemList } from '../types/dto'

export function useProblemList(problemListId: string) {
  const { data, error } = useSWR<ProblemList>([`/problem-lists/${problemListId}?depth=1`])

  return {
    problemList: data,
    isLoading: !data && !error,
    error: error,
  }
}
