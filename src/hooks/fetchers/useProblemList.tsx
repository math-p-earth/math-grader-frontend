import useSWR from 'swr'

import { ProblemList } from '../../types/payload-types'

export function useProblemList(problemListId: string) {
  const { data, error } = useSWR<ProblemList>([`/problem-lists/${problemListId}`])

  return {
    problemList: data,
    isLoading: !data && !error,
    error: error,
  }
}
